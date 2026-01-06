import * as v from "valibot";

export const LocationTypeSchema = v.picklist([
	"plane",
	"region",
	"city",
	"shop",
	"mine",
	"forest",
	"beach",
	"wilderness",
]);

export type LocationType = v.InferOutput<typeof LocationTypeSchema>;
