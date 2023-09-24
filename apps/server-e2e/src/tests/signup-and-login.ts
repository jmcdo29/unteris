import { randomUUID } from "crypto";
import { spec } from "pactum";
import { describe, expect, test, vi } from "vitest";
import { loginStep, signup } from "../auth";
import { csrfSpec, sessionStoreToken } from "../csrf";
import { TestContext } from "../interfaces/test-context.interface";

export const signUpAndLoginTests = () => {
	return describe("SignUp and Login", () => {
		const testPass = "ALongEnoughP4ssw0rdToBeFin3";
		test<TestContext>("A new user should be able to sign up", async (context) => {
			await csrfSpec();
			const emailSpy = vi.spyOn(context.mailer, "sendMail");
			const email = `${randomUUID()}@testing.com`;
			const name = `Test User${randomUUID()}`;
			const res = await signup({ email, name, password: testPass });
			// assert we properly made the user, login method, and related local login
			const userAccount = await context.db
				.selectFrom("userAccount as ua")
				.innerJoin("loginMethod as lm", "lm.userId", "ua.id")
				.innerJoin("localLogin as ll", "ll.loginMethodId", "lm.id")
				.select(({ fn }) => [fn.count("ua.id").as("count")])
				.where("ua.id", "=", res.id)
				.execute();
			expect(userAccount[0].count).toBe("1");

			await loginStep({ email, name, password: testPass });

			let emailResult = undefined;
			for await (const result of emailSpy.mock.results) {
				const json = JSON.parse(result.value.message);
				if (json.subject === "Email verification") {
					emailResult = json.html;
					break;
				}
			}
			if (!emailResult) {
				throw new Error(
					`No email was ever sent to ${email}. This means something broke in the signup flow`,
				);
			}
			const verifyToken = emailResult.split("verify?token=")[1].split(">")[0];
			await spec()
				.get("/auth/verify-email")
				.withQueryParams("verificationToken", verifyToken)
				.withCookies("sessionId", sessionStoreToken)
				.expectStatus(200)
				.expectJson({ success: true });
		});
	});
};
