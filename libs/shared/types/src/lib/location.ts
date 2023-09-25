import { Output, enumType, nullable, object, string, ulid } from "valibot";

export const LocationSchema = object({
	id: string([ulid()]),
	name: string(),
	description: nullable(string()),
	type: nullable(
		enumType([
			"plane",
			"region",
			"city",
			"shop",
			"mine",
			"forest",
			"beach",
			"wilderness",
		]),
	),
	parentId: nullable(string([ulid()])),
});

export type Location = Output<typeof LocationSchema>;
