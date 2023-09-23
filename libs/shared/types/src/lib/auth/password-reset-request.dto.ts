import { z } from 'zod';

export const PasswordResetRequestSchema = z.object({
	email: z.string().email(),
});

export type PasswordResetRequest = z.infer<typeof PasswordResetRequestSchema>;
