import { type Output, email, minLength, object, string } from "valibot";

export const LoginBodySchema = object({
	email: string([email()]),
	password: string([minLength(12)]),
});

export type LoginBody = Output<typeof LoginBodySchema>;
