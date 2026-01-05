import * as v from "valibot";

export const IdParamSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
});

export type IdParam = v.InferOutput<typeof IdParamSchema>;
