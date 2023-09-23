import { z } from "zod";

export const LocationSchema = z.object({
	id: z.string().ulid(),
	name: z.string(),
	description: z.string().nullable(),
	type: z
		.enum([
			"plane",
			"region",
			"city",
			"shop",
			"mine",
			"forest",
			"beach",
			"wilderness",
		])
		.nullable(),
	parentId: z.string().ulid().nullable(),
});

export type Location = z.infer<typeof LocationSchema>;
