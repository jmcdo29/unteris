import * as v from "valibot";

export const DeityCategorySchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	name: v.string(),
});

export type DeityCategory = v.InferOutput<typeof DeityCategorySchema>;
