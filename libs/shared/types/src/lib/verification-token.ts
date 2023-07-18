import { z } from 'zod';

export const VerificationTokenSchmea = z.object({
  id: z.string().ulid(),
  token: z.string(),
  userIid: z.string().ulid(),
  expiresAt: z.date(),
  type: z.enum(['verification', 'reset']),
});

export type VerificationToken = z.infer<typeof VerificationTokenSchmea>;
