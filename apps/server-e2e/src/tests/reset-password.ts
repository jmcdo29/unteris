import { randomUUID } from "node:crypto";
import { spec } from "pactum";
import { describe, test, vi } from "vitest";
import { loginStep, signup } from "../auth";
import type { TestContext } from "../interfaces/test-context.interface";

export const resetPasswordTest = () =>
	describe("Reset Password Flow", () => {
		const testPass = randomUUID();
		test<TestContext>("A user should be able to reset their password", async (context) => {
			const emailSpy = vi.spyOn(context.mailer, "sendMail");
			const userUUID = randomUUID();
			const email = `${userUUID}@testing.com`;
			const name = `Test User${userUUID}`;
			const _res = await signup({ email, name, password: testPass });

			await spec()
				.post("/auth/password-reset-request")
				.withBody({ email })
				.expectStatus(201)
				.expectJson({ success: true });

			let emailResult: string = "";
			for await (const result of emailSpy.mock.settledResults) {
				const json = JSON.parse(result.value.message);
				if (json.subject === "Reset Password") {
					emailResult = json.html;
					break;
				}
			}
			const resetToken = emailResult
				.split("reset-password?resetToken=")[1]
				.split(">")[0];
			const newPassword = randomUUID();
			await spec()
				.post("/auth/password-reset")
				.withBody({ password: newPassword, resetToken })
				.expectStatus(201)
				.expectJson({ success: true });
			await spec()
				.post("/auth/login")
				.withBody({ email, password: testPass })
				.expectStatus(401)
				.expectJsonLike(".type", "Authentication");
			await loginStep({ email, name, password: newPassword });
		});
	});
