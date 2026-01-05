import * as v from "valibot";

export const PasswordResetSchema = v.object({
	resetToken: v.pipe(v.string(), v.length(43)),
	password: v.string(),
});

export type PasswordReset = v.InferOutput<typeof PasswordResetSchema>;
