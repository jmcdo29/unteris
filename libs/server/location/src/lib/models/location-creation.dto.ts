import { LocationTypeSchema, ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

export const LocationCreationSchema = v.object({
	name: v.string(),
	description: v.optional(v.string()),
	type: LocationTypeSchema,
	parentId: v.optional(v.pipe(v.string(), v.ulid())),
});

export type LocationCreation = v.InferOutput<typeof LocationCreationSchema>;

export class LocationCreationDto extends ValibotDto(LocationCreationSchema) {}
