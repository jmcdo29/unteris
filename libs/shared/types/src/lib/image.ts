import { Output, enumType, object, nullable, string, ulid } from "valibot";

export const ImageSchema = object({
	id: string([ulid()]),
	type: enumType(["deity_avatar", "user_avatar"]),
	originalUrl: string(),
	smallUrl: nullable(string()),
	mediumUrl: nullable(string()),
	largeUrl: nullable(string()),
});

export type Image = Output<typeof ImageSchema>;
