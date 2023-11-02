import { Output, object, optional, string, ulid } from "valibot";
import { LocationTypeSchema } from "./location-type";

export const LocationUpdateSchema = object({
	name: optional(string()),
	description: optional(string()),
	type: optional(LocationTypeSchema),
	parentId: optional(string([ulid()])),
});

export type LocationUpdate = Output<typeof LocationUpdateSchema>;
