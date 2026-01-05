import { ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

const GetByIdResponseSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	name: v.string(),
	description: v.string(),
	ageDescription: v.string(),
	sizeDescription: v.string(),
	type: v.union([v.literal("fey"), v.literal("humanoid")]),
	speed: v.number(),
	knownLanguages: v.string(),
	racialAbilities: v.array(
		v.object({ name: v.string(), description: v.string() }),
	),
});

export type RaceWithAbilities = v.InferOutput<typeof GetByIdResponseSchema>;

export class GetRaceByIdResponseDto extends ValibotDto(GetByIdResponseSchema) {}
