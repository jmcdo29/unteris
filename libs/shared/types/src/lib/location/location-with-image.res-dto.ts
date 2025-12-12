import { nullable, type Output, object, string, ulid } from "valibot";
import { LocationTypeSchema } from "./location-type";

export const LocationWithImageSchema = object({
	name: string(),
	id: string([ulid()]),
	description: nullable(string()),
	type: LocationTypeSchema,
	parentId: nullable(string([ulid()])),
	imageUrl: nullable(string()),
});

export type LocationWithImage = Output<typeof LocationWithImageSchema>;
