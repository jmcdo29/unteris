import { SuccessSchema, ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

const PasswordResetRequestResponseSchema = v.object({
	...SuccessSchema.entries,
});

export type PasswordResetRequestResponse = v.InferOutput<
	typeof PasswordResetRequestResponseSchema
>;

export class PasswordResetRequestResponseDto extends ValibotDto(
	PasswordResetRequestResponseSchema,
) {}
