import {
	Output,
	array,
	boolean,
	email,
	enumType,
	object,
	string,
	ulid,
} from "valibot";
import { RoleEnumSchema } from "./role.enum";

export const AuthorizedUserSchema = object({
	id: string([ulid()]),
	email: string([email()]),
	roles: array(RoleEnumSchema),
	name: string(),
	isVerified: boolean(),
});

export type AuthorizedUser = Output<typeof AuthorizedUserSchema>;
