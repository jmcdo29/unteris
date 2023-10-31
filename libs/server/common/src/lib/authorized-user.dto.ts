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

export const AuthorizedUserSchema = object({
	id: string([ulid()]),
	email: string([email()]),
	roles: array(enumType(["player", "dev", "dm", "admin"])),
	name: string(),
	isVerified: boolean(),
});

export type AuthorizedUser = Output<typeof AuthorizedUserSchema>;
