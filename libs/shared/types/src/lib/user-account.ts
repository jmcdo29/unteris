import { z } from "zod";

export const UserAccountSchema = z.object({
	id: z.string().ulid(),
	name: z.string(),
	email: z.string().email(),
	isVerified: z.boolean(),
	imageId: z.string().url().optional(),
});

export type UserAccount = z.infer<typeof UserAccountSchema>;
