import { SuccessSchema, ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

const PasswordResetResponseSchema = v.object({
	...SuccessSchema.entries,
});

export type PasswordResetResponse = v.InferOutput<
	typeof PasswordResetResponseSchema
>;

export class PasswordResetResponseDto extends ValibotDto(
	PasswordResetResponseSchema,
) {}
