import { type Output, object, string, ulid } from "valibot";

export const LocationParamSchema = object({
	location: string([ulid()]),
});

export type LocationParam = Output<typeof LocationParamSchema>;
