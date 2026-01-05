import * as v from "valibot";

import { LocationTypeSchema } from "./location-type";

export const LocationWithImageSchema = v.object({
	name: v.string(),
	id: v.pipe(v.string(), v.ulid()),
	description: v.nullable(v.string()),
	type: LocationTypeSchema,
	parentId: v.nullable(v.pipe(v.string(), v.ulid())),
	imageUrl: v.nullable(v.string()),
});

export type LocationWithImage = v.InferOutput<typeof LocationWithImageSchema>;
