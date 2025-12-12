import { csrfHeader } from "@unteris/shared/types";
import { spec } from "pactum";
import { describe, test } from "vitest";
import { csrfSpec, csrfStoreToken, sessionStoreToken } from "../csrf";

export const csrfTest = () =>
	describe("CSRF Tests", () => {
		test("CSRF Testing", async () => {
			await csrfSpec();
			await spec()
				.post("/csrf/verify")
				.withHeaders(csrfHeader, csrfStoreToken)
				.withCookies("sessionId", sessionStoreToken)
				.expectStatus(201)
				.expectJson({ success: true })
				.toss();
		});
	});
