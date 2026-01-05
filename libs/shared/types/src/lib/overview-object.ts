import * as v from "valibot";

export const OverviewObjectSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	name: v.string(),
});

export type OverviewObject = v.InferOutput<typeof OverviewObjectSchema>;
