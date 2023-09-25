import { Output, object, string, ulid } from "valibot";

export const CategoryParamSchema = object({
	category: string([ulid()]),
});

export type CategoryParam = Output<typeof CategoryParamSchema>;
