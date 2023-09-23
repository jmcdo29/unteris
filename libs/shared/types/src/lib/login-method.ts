import { z } from 'zod';

export const LoginMethodSchema = z.object({
	id: z.string().ulid(),
	userId: z.string().ulid(),
	name: z.enum(['local']),
});
export type LoginMethod = z.infer<typeof LoginMethodSchema>;
