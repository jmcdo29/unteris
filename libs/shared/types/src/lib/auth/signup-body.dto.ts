import { Output, email, minLength, object, string } from "valibot";

export const SignupSchema = object({
	email: string([email()]),
	password: string([minLength(12)]),
	name: string([minLength(3)]),
});

export type SignupUser = Output<typeof SignupSchema>;
