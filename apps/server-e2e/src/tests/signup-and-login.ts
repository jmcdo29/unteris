import { randomUUID } from "crypto";
import { base32Regex } from "@unteris/shared/base32";
import { spec } from "pactum";
import { regex } from "pactum-matchers";
import { describe, expect, test, vi } from "vitest";
import { csrfSpec, csrfStoreToken, sessionStoreToken } from "../csrf";
import { TestContext } from "../interfaces/test-context.interface";

export const signUpAndLoginTests = () => {
	return describe("SignUp and Login", () => {
		const testPass = "ALongEnoughP4ssw0rdToBeFin3";
		test<TestContext>("A new user should be able to sign up", async (context) => {
			await csrfSpec();
			const emailSpy = vi.spyOn(context.mailer, "sendMail");
			const email = `${randomUUID()}@testing.com`;
			const name = `Test User${randomUUID()}`;
			const res = await spec()
				.post("/auth/signup")
				.withBody({
					email,
					password: testPass,
					confirmationPassword: testPass,
					name,
				})
				.withHeaders("X-UNTERIS-CSRF-PROTECTION", csrfStoreToken)
				.withCookies("sessionId", sessionStoreToken)
				.expectStatus(201)
				.expectJsonMatch({
					id: regex(base32Regex),
					success: true,
				})
				.returns(".id");
			// assert we properly made the user, login method, and related local login
			const userAccount = await context.db
				.selectFrom("userAccount as ua")
				.innerJoin("loginMethod as lm", "lm.userId", "ua.id")
				.innerJoin("localLogin as ll", "ll.loginMethodId", "lm.id")
				.select(({ fn }) => [fn.count("ua.id").as("count")])
				.where("ua.id", "=", res)
				.execute();
			expect(userAccount[0].count).toBe("1");
			await spec()
				.post("/auth/login")
				.withBody({
					email,
					password: testPass,
				})
				.withHeaders("X-UNTERIS-CSRF-PROTECTION", csrfStoreToken)
				.withCookies("sessionId", sessionStoreToken)
				.expectStatus(201)
				.expectJsonMatch({
					displayName: name,
					id: regex(base32Regex),
					success: true,
				});
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
