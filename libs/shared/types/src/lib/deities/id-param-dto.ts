import { type Output, object, string, ulid } from "valibot";

export const IdParamSchema = object({
	id: string([ulid()]),
});

export type IdParam = Output<typeof IdParamSchema>;
