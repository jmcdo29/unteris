import { Output, enumType, object, optional, string, ulid } from "valibot";

export const ImageSchema = object({
	id: string([ulid()]),
	type: enumType(["deity_avatar", "user_avatar"]),
	originalUrl: string(),
	smallUrl: optional(string()),
	mediumUrl: optional(string()),
	largeUrl: optional(string()),
});

export type Image = Output<typeof ImageSchema>;
