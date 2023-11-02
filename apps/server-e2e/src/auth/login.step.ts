import { base32Regex } from "@unteris/shared/base32";
import { csrfHeader } from "@unteris/shared/types";
import { spec } from "pactum";
import { regex } from "pactum-matchers";
import { csrfStoreToken, sessionStoreToken } from "../csrf";

export const loginStep = async ({
	email,
	password,
	name,
}: { email: string; password: string; name: string }): Promise<void> => {
	await spec()
		.post("/auth/login")
		.withBody({ email, password })
		.withHeaders(csrfHeader, csrfStoreToken)
		.withCookies("sessionId", sessionStoreToken)
		.expectStatus(201)
		.expectJsonMatch({
			displayName: name,
			id: regex(base32Regex),
			success: true,
		});
};
