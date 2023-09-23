import { z } from 'zod';

export const UserPermissionSchema = z.object({
	id: z.string().ulid(),
	userId: z.string().ulid(),
	roleId: z.string().ulid(),
});

export type UserPermission = z.infer<typeof UserPermissionSchema>;
