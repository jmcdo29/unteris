import { type Output, array, object, optional, string, ulid } from "valibot";
import { DomainSchema } from "./domain";

export const DeitySchema = object({
	id: string([ulid()]),
	name: string(),
	description: string(),
	imageId: optional(string()),
	categoryId: optional(string([ulid()])),
	locationId: optional(string([ulid()])),
	domain: optional(array(DomainSchema)),
});

export type Deity = Output<typeof DeitySchema>;
