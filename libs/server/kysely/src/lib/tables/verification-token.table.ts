import * as v from "valibot";

export const VerificationTokenSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	token: v.string(),
	userId: v.pipe(v.string(), v.ulid()),
	type: v.union([v.literal("verification"), v.literal("reset")]),
});

export type VerificationToken = v.InferOutput<typeof VerificationTokenSchema>;
