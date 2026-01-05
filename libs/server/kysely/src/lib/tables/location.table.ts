import * as v from "valibot";

export const LocationSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	name: v.string(),
	description: v.nullable(v.string()),
	type: v.union([
		v.literal("plane"),
		v.literal("region"),
		v.literal("city"),
		v.literal("shop"),
		v.literal("mine"),
		v.literal("beach"),
		v.literal("forest"),
		v.literal("wilderness"),
	]),
	parentId: v.nullable(v.pipe(v.string(), v.ulid())),
	imageId: v.nullable(v.pipe(v.string(), v.ulid())),
});

export type Location = v.InferOutput<typeof LocationSchema>;
