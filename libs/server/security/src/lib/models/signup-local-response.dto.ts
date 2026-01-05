import { ValibotDto } from "@unteris/server/common";
import { SuccessSchema } from "@unteris/shared/types";
import * as v from "valibot";

const SignUpLocalResponseSchema = v.object({
	...SuccessSchema.entries,
	id: v.pipe(v.string(), v.ulid()),
	sessionId: v.string(),
});

export type SignUpLocalResponse = v.InferOutput<
	typeof SignUpLocalResponseSchema
>;

export class SignUpLocalResponseDtp extends ValibotDto(
	SignUpLocalResponseSchema,
) {}
