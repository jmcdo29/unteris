import * as v from "valibot";

import { LocationTypeSchema } from "./location-type";

export const LocationCreationSchema = v.object({
	name: v.string(),
	description: v.optional(v.string()),
	type: LocationTypeSchema,
	parentId: v.optional(v.pipe(v.string(), v.ulid())),
});

export type LocationCreation = v.InferOutput<typeof LocationCreationSchema>;
