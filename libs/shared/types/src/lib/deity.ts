import { z } from 'zod';
export const DeitySchema = z.object({
  id: z.string().ulid(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  category: z.string().ulid().optional(),
  location: z.string().ulid().optional(),
});

export type Deity = z.infer<typeof DeitySchema>;
