import * as v from "valibot";

export const DeitySchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	name: v.string(),
	description: v.string(),
	imageId: v.nullable(v.pipe(v.string(), v.ulid())),
	categoryId: v.pipe(v.string(), v.ulid()),
	locationId: v.pipe(v.string(), v.ulid()),
});

export type Deity = v.InferOutput<typeof DeitySchema>;
