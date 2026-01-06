import { SuccessSchema, ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

const GetVerifyEmailResponseSchema = v.object({ ...SuccessSchema.entries });

export type GetVerifyEmailResponse = v.InferOutput<
	typeof GetVerifyEmailResponseSchema
>;

export class GetVerifyEmailResponseDto extends ValibotDto(
	GetVerifyEmailResponseSchema,
) {}
