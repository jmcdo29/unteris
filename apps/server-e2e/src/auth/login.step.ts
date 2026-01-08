import { base32Regex } from "@unteris/shared/base32";
import { spec } from "pactum";
import { regex } from "pactum-matchers";

export const loginStep = async ({
	email,
	password,
	name,
}: {
	email: string;
	password: string;
	name: string;
}): Promise<void> => {
	await spec()
		.post("/auth/login")
		.withBody({ email, password })
		.expectStatus(201)
		.expectJsonMatch({
			displayName: name,
			id: regex(base32Regex),
			success: true,
			sessionId: regex(/.*/),
		})
		.stores("sessionToken", ".sessionId");
};
