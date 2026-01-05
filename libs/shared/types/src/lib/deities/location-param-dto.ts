import * as v from "valibot";

export const LocationParamSchema = v.object({
	location: v.pipe(v.string(), v.ulid()),
});

export type LocationParam = v.InferOutput<typeof LocationParamSchema>;
