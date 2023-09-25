import { Output, number, object, string } from "valibot";

export const RaceSchema = object({
	id: string(),
	name: string(),
	description: string(),
	ageDescription: string(),
	sizeDescription: string(),
	type: string(),
	speed: number(),
	knownLanguages: string(),
});

export type Race = Output<typeof RaceSchema>;
