import { Output, object, string, ulid } from "valibot";

export const RoleSchema = object({
	id: string([ulid()]),
	name: string(),
});

export type Role = Output<typeof RoleSchema>;
