import { Output, array, merge, object, pick } from "valibot";
import { RaceSchema } from "./race";
import { RacialAbilitySchema } from "./racial-ability";

export const RaceWithAbilitiesSchema = merge([
	RaceSchema,
	object({
		racialAbilities: array(pick(RacialAbilitySchema, ["name", "description"])),
	}),
]);

export type RaceWithAbilities = Output<typeof RaceWithAbilitiesSchema>;
