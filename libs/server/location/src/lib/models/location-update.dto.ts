import { LocationTypeSchema, ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

export const LocationUpdateSchema = v.object({
	name: v.optional(v.string()),
	description: v.optional(v.string()),
	type: v.optional(LocationTypeSchema),
	parentId: v.optional(v.pipe(v.string(), v.ulid())),
});

export type LocationUpdate = v.InferOutput<typeof LocationUpdateSchema>;

export class LocationUpdateDto extends ValibotDto(LocationUpdateSchema) {}
