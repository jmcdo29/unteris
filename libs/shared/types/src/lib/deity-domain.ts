import { z } from 'zod';

export const DeityDomainSchema = z.object({
  id: z.string().ulid(),
  name: z.string(),
});

export type DeityDomain = z.infer<typeof DeityDomainSchema>;
