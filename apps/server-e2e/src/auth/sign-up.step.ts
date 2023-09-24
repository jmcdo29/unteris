import { spec } from "pactum";
import { csrfStoreToken, sessionStoreToken } from "../csrf";
import { base32, base32Regex } from "@unteris/shared/base32";
import { regex } from "pactum-matchers";

export const signup = async ({
	email,
	password,
	name,
}: { email: string; password: string; name: string }): Promise<{
	id: string;
}> => {
	const res = await spec()
		.post("/auth/signup")
		.withBody({
			email,
			password,
			confirmationPassword: password,
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
	return { id: res };
};
