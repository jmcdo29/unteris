import { z } from 'zod';

export const RacialAbilitySchema = z.object({
	id: z.string(),
	raceId: z.string(),
	name: z.string(),
	description: z.string(),
});

export type RacialAbility = z.infer<typeof RacialAbilitySchema>;
