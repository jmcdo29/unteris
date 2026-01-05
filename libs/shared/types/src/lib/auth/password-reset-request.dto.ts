import * as v from "valibot";

export const PasswordResetRequestSchema = v.object({
	email: v.pipe(v.string(), v.email()),
});

export type PasswordResetRequest = v.InferOutput<
	typeof PasswordResetRequestSchema
>;
