import { type Output, object, string, ulid } from "valibot";

export const DeityCategorySchema = object({
	id: string([ulid()]),
	name: string(),
});

export type DeityCategory = Output<typeof DeityCategorySchema>;
