import { ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

const PasswordResetRequestSchema = v.object({
	email: v.pipe(v.string(), v.email()),
});

export type PasswordResetRequest = v.InferOutput<
	typeof PasswordResetRequestSchema
>;

export class PasswordResetRequestDto extends ValibotDto(
	PasswordResetRequestSchema,
) {}
