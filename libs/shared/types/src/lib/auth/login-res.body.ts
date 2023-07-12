import { z } from 'zod';

const LoginResponseSchema = z.object({
  id: z.string().ulid(),
  displayName: z.string(),
  success: z.boolean(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
