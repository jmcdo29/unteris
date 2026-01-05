import * as v from "valibot";

export const CategoryParamSchema = v.object({
	category: v.pipe(v.string(), v.ulid()),
});

export type CategoryParam = v.InferOutput<typeof CategoryParamSchema>;
