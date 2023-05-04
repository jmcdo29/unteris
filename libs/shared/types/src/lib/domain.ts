import { z } from 'zod';

export const DomainSchema = z.object({
  id: z.string().ulid(),
  name: z.string(),
});

export type Domain = z.infer<typeof DomainSchema>;
