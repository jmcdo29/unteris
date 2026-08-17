import * as v from "valibot";

export const RacialAbilitySchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	raceId: v.pipe(v.string(), v.ulid()),
	name: v.string(),
	description: v.string(),
});

export type RacialAbility = v.InferOutput<typeof RacialAbilitySchema>;
