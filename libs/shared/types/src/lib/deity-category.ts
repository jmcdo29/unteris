import { z } from "zod";

export const DeityCategorySchema = z.object({
	id: z.string().ulid(),
	name: z.string(),
});

export type DeityCategory = z.infer<typeof DeityCategorySchema>;
