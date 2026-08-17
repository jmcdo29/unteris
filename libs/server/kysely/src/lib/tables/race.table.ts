import * as v from "valibot";

export const RaceSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	name: v.string(),
	description: v.string(),
	type: v.union([v.literal("fey"), v.literal("humanoid")]),
	ageDescription: v.string(),
	sizeDescription: v.string(),
	speed: v.pipe(v.number(), v.integer()),
	knownLanguages: v.string(),
});

export type Race = v.InferOutput<typeof RaceSchema>;
