import * as v from "valibot";

export const LocalLoginSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	password: v.string(),
	loginMethodId: v.pipe(v.string(), v.ulid()),
	lastUsed: v.union([v.pipe(v.string(), v.isoTimestamp()), v.date()]),
	attempts: v.pipe(v.number(), v.integer()),
});

export type LocalLogin = v.InferOutput<typeof LocalLoginSchema>;
