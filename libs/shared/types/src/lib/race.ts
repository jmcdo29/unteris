import { z } from 'zod';

export const RaceSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	ageDescription: z.string(),
	sizeDescription: z.string(),
	type: z.string(),
	speed: z.number(),
	knownLanguages: z.string(),
});

export type Race = z.infer<typeof RaceSchema>;
