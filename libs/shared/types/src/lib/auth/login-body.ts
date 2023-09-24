import { Output, email, minLength, object, string } from "valibot";
import { z } from "zod";

export const LoginBodySchema = object({
	email: string([email()]),
	password: string([minLength(12)]),
});

export type LoginBody = Output<typeof LoginBodySchema>;
