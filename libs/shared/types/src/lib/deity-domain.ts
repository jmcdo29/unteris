import { z } from 'zod';

export const DeityDomainSchema = z.object({
	deityId: z.string().ulid(),
	domainId: z.string().ulid(),
});

export type DeityDomain = z.infer<typeof DeityDomainSchema>;
