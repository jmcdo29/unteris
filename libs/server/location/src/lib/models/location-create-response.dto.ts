import { ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

const LocationCreateResponseSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	name: v.string(),
	description: v.nullable(v.string()),
	parentId: v.nullable(v.pipe(v.string(), v.ulid())),
	imageId: v.nullable(v.pipe(v.string(), v.ulid())),
});

export type LocationCreateResponse = v.InferOutput<
	typeof LocationCreateResponseSchema
>;

export class LocationCreateResponseDto extends ValibotDto(
	LocationCreateResponseSchema,
) {}
