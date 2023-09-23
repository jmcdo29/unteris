import { z } from "zod";
import { RaceSchema } from "./race";
import { RacialAbilitySchema } from "./racial-ability";

export const RaceWithAbilitiesSchema = RaceSchema.and(
	z.object({
		racialAbilities: z.array(
			RacialAbilitySchema.pick({ name: true, description: true }),
		),
	}),
);

export type RaceWithAbilities = z.infer<typeof RaceWithAbilitiesSchema>;
