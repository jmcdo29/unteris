import { ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

const GetByIdResponseSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	name: v.string(),
	description: v.string(),
	domain: v.array(
		v.object({
			id: v.pipe(v.string(), v.ulid()),
			name: v.string(),
			type: v.union([
				v.literal("cleric"),
				v.literal("druid"),
				v.literal("warlock"),
			]),
		}),
	),
	imageUrl: v.nullable(v.string()),
});

export type DeityResponse = v.InferOutput<typeof GetByIdResponseSchema>;

export class GetDeityByIdResponseDto extends ValibotDto(
	GetByIdResponseSchema,
) {}
