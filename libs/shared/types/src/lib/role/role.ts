import { type Output, enumType, object, string, ulid } from "valibot";
import { RoleEnum } from "./role.enum";

export const RoleSchema = object({
	id: string([ulid()]),
	name: RoleEnum,
});

export type Role = Output<typeof RoleSchema>;
