import { z } from 'zod';

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
  name: z.string(),
});

export type SignupUser = z.infer<typeof SignupSchema>;
