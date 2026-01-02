import { array, boolean, type Output, object, string, ulid } from "valibot";
import { RoleEnum } from "../role";

const LoginResponseSchema = object({
	id: string([ulid()]),
	displayName: string(),
	success: boolean(),
	roles: array(RoleEnum),
	sessionId: string(),
});

export type LoginResponse = Output<typeof LoginResponseSchema>;
