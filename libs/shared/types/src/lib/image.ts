import { Output, enumType, nullable, object, string, ulid } from "valibot";

export const ImageSchema = object({
	id: string([ulid()]),
	type: enumType(["deity_avatar", "user_avatar", "location_image"]),
	originalUrl: string(),
	smallUrl: nullable(string()),
	mediumUrl: nullable(string()),
	largeUrl: nullable(string()),
});

export type Image = Output<typeof ImageSchema>;
