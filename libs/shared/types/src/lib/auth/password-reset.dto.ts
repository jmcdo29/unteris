import { Output, length, object, string } from "valibot";

export const PasswordResetSchema = object({
	resetToken: string([length(43)]),
	password: string(),
});

export type PasswordReset = Output<typeof PasswordResetSchema>;
