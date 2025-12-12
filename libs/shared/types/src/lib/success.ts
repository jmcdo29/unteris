import { boolean, type Output, object } from "valibot";

export const SuccessSchema = object({
	success: boolean(),
});

export type Success = Output<typeof SuccessSchema>;
