import { type Output, object, string, ulid } from "valibot";

export const UserPermissionSchema = object({
	id: string([ulid()]),
	userId: string([ulid()]),
	roleId: string([ulid()]),
});

export type UserPermission = Output<typeof UserPermissionSchema>;
