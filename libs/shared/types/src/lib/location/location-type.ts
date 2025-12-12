import { enumType, type Output } from "valibot";

export const LocationTypeSchema = enumType([
	"plane",
	"region",
	"city",
	"shop",
	"mine",
	"forest",
	"beach",
	"wilderness",
]);

export type LocationType = Output<typeof LocationTypeSchema>;
