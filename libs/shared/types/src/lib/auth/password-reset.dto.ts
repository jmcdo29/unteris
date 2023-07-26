import { z } from 'zod';

export const PasswordResetSchema = z.object({
  resetToken: z.string().length(43),
  password: z.string(),
});

export type PasswordReset = z.infer<typeof PasswordResetSchema>;
