import { Output, nullable, object, optional, string, ulid } from "valibot";
import { LocationTypeSchema } from "./location-type";

export const LocationCreationSchema = object({
	name: string(),
	description: optional(string()),
	type: LocationTypeSchema,
	parentId: optional(string([ulid()])),
});

export type LocationCreation = Output<typeof LocationCreationSchema>;
