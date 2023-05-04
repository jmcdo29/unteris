import { z } from 'zod';

export const LocationSchema = z.object({
  id: z.string().ulid(),
  name: z.string(),
  description: z.string().nullable(),
});

export type Location = z.infer<typeof LocationSchema>;
