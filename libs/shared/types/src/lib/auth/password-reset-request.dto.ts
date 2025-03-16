import { type Output, email, object, string } from "valibot";

export const PasswordResetRequestSchema = object({
	email: string([email()]),
});

export type PasswordResetRequest = Output<typeof PasswordResetRequestSchema>;
