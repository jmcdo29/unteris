import * as v from "valibot";

export const UserPermissionSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	userId: v.pipe(v.string(), v.ulid()),
	roleId: v.pipe(v.string(), v.ulid()),
});

export type UserPermission = v.InferOutput<typeof UserPermissionSchema>;
