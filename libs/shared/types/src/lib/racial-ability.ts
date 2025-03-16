import { type Output, object, string } from "valibot";

export const RacialAbilitySchema = object({
	id: string(),
	raceId: string(),
	name: string(),
	description: string(),
});

export type RacialAbility = Output<typeof RacialAbilitySchema>;
