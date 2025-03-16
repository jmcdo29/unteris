import { type Output, array, boolean, object, string, ulid } from "valibot";
import { RoleEnum } from "../role";

const LoginResponseSchema = object({
	id: string([ulid()]),
	displayName: string(),
	success: boolean(),
	roles: array(RoleEnum),
});

export type LoginResponse = Output<typeof LoginResponseSchema>;
