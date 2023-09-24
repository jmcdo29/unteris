import { z } from "zod";

export const ImageSchema = z.object({
	id: z.string().ulid(),
	type: z.enum(["deity_avatar", "user_avatar"]),
	originalUrl: z.string(),
	smallUrl: z.string().optional(),
	mediumUrl: z.string().optional(),
	largeUrl: z.string().optional(),
});

export type Image = z.infer<typeof ImageSchema>;
