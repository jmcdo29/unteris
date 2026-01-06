import { LocationTypeSchema, ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

export const LocationWithImageSchema = v.object({
	name: v.string(),
	id: v.pipe(v.string(), v.ulid()),
	description: v.nullable(v.string()),
	type: LocationTypeSchema,
	parentId: v.nullable(v.pipe(v.string(), v.ulid())),
	imageUrl: v.nullable(v.string()),
});

export type GetLocationByIdResponse = v.InferOutput<
	typeof LocationWithImageSchema
>;

export class GetLocationByIdResponseDto extends ValibotDto(
	LocationWithImageSchema,
) {}
