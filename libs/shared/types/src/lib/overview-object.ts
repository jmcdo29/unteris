import { Output, object, string, ulid } from "valibot";

export const OverviewObjectSchema = object({
	id: string([ulid()]),
	name: string(),
});

export type OverviewObject = Output<typeof OverviewObjectSchema>;
