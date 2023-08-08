import { z } from 'zod';
import { DomainSchema } from './domain';

export const DeitySchema = z.object({
  id: z.string().ulid(),
  name: z.string(),
  description: z.string(),
  imageId: z.string(),
  categoryId: z.string().ulid().optional(),
  locationId: z.string().ulid().optional(),
  domain: z.array(DomainSchema).optional(),
});

export type Deity = z.infer<typeof DeitySchema>;
