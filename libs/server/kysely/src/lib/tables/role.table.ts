import * as v from "valibot";

export const RoleSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	name: v.union([
		v.literal("player"),
		v.literal("dm"),
		v.literal("dev"),
		v.literal("admin"),
	]),
});

export type Role = v.InferOutput<typeof RoleSchema>;
