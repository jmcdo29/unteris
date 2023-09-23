import { z } from 'zod';

export const DomainSchema = z.object({
	id: z.string().ulid(),
	name: z.string(),
	type: z.union([
		z.literal('warlock'),
		z.literal('druid'),
		z.literal('cleric'),
	]),
});

export type Domain = z.infer<typeof DomainSchema>;
