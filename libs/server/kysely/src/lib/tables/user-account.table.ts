import * as v from "valibot";

export const UserAccountSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	name: v.string(),
	email: v.pipe(v.string(), v.email()),
	isVerified: v.boolean(),
	imageId: v.nullable(v.pipe(v.string(), v.ulid())),
});

export type UserAccount = v.InferOutput<typeof UserAccountSchema>;
