import * as v from "valibot";

export const LoginMethodSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	userId: v.pipe(v.string(), v.ulid()),
	name: v.literal("local"),
});

export type LoginMethod = v.InferOutput<typeof LoginMethodSchema>;
