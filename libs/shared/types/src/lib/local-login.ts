import { z } from "zod";

export const LocalLoginSchema = z.object({
	id: z.string().ulid(),
	password: z.string(),
	loginMethodId: z.string().ulid(),
	lastUsed: z.string().datetime().optional(),
	attempts: z.number().default(0),
});

export type LocalLogin = z.infer<typeof LocalLoginSchema>;
