import { RoleEnumSchema, ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

const LoginResponseSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	displayName: v.string(),
	success: v.boolean(),
	roles: v.array(RoleEnumSchema),
	sessionId: v.string(),
});

export type LoginResponse = v.InferOutput<typeof LoginResponseSchema>;

export class LoginResponseDto extends ValibotDto(LoginResponseSchema) {}
