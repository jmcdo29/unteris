import { Output, enumType, object, string, ulid } from "valibot";

export const RoleSchema = object({
	id: string([ulid()]),
	name: enumType(["player", "dev", "admin", "dm"]),
});

export type Role = Output<typeof RoleSchema>;
