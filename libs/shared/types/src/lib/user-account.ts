import { z } from 'zod';

export const UserAccountSchema = z.object({
  id: z.string().ulid(),
  name: z.string(),
  email: z.string().email(),
  isVerifified: z.boolean(),
  photoUrl: z.string().url().optional(),
});

export type UserAccount = z.infer<typeof UserAccountSchema>;
