import { RoleEnumSchema, ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

const SignUpLocalResponseSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	displayName: v.string(),
	success: v.boolean(),
	roles: v.array(RoleEnumSchema),
	sessionId: v.string(),
});

export type SignUpLocalResponse = v.InferOutput<
	typeof SignUpLocalResponseSchema
>;

export class SignUpLocalResponseDto extends ValibotDto(
	SignUpLocalResponseSchema,
) {}
