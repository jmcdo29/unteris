import * as v from "valibot";

import { LocationTypeSchema } from "./location-type";

export const LocationUpdateSchema = v.object({
	name: v.optional(v.string()),
	description: v.optional(v.string()),
	type: v.optional(LocationTypeSchema),
	parentId: v.optional(v.pipe(v.string(), v.ulid())),
});

export type LocationUpdate = v.InferOutput<typeof LocationUpdateSchema>;
