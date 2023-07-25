import { z } from 'zod';

export const PasswordResetSchema = z.object({
  email: z.string().email(),
});

export type PasswordReset = z.infer<typeof PasswordResetSchema>;
