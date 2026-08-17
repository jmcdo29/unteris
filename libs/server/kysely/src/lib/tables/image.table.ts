import * as v from "valibot";

export const ImageSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	type: v.union([v.literal("deity_avatar"), v.literal("location_image")]),
	originalUrl: v.string(),
	smallUrl: v.nullable(v.string()),
	mediumUrl: v.nullable(v.string()),
	largeUrl: v.nullable(v.string()),
});

export type SavedImage = v.InferOutput<typeof ImageSchema>;
