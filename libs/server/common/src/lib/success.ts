import * as v from "valibot";

export const SuccessSchema = v.object({
	success: v.boolean(),
});

export type Success = v.InferOutput<typeof SuccessSchema>;
