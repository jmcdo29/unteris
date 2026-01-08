import { base32Regex } from "@unteris/shared/base32";
import { spec } from "pactum";
import { regex } from "pactum-matchers";

export const signup = async ({
	email,
	password,
	name,
}: {
	email: string;
	password: string;
	name: string;
}): Promise<{
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
		.expectStatus(201)
		.expectJsonMatch({
			id: regex(base32Regex),
			success: true,
		})
		.stores("sessionToken", ".sessionId")
		.returns(".id");
	return { id: res };
};
