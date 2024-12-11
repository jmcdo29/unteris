import { base32Regex } from "@unteris/shared/base32";
import { csrfHeader } from "@unteris/shared/types";
import { spec, stash } from "pactum";
import { regex } from "pactum-matchers";
import { csrfSpec, csrfStoreToken, sessionStoreToken } from "../csrf";

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
		.withHeaders(csrfHeader, csrfStoreToken)
		.withCookies("sessionId", sessionStoreToken)
		.expectStatus(201)
		.expectJsonMatch({
			id: regex(base32Regex),
			success: true,
		})
		.returns(".id");
	return { id: res };
};
