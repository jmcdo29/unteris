import { Output, enumType, nullable, object, string, ulid } from "valibot";
import { LocationTypeSchema } from "./location-type";

export const LocationSchema = object({
	id: string([ulid()]),
	name: string(),
	description: nullable(string()),
	type: LocationTypeSchema,
	parentId: nullable(string([ulid()])),
	imageId: nullable(string([ulid()])),
});

export type Location = Output<typeof LocationSchema>;
