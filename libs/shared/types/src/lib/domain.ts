import { literal, type Output, object, string, ulid, union } from "valibot";

export const DomainSchema = object({
	id: string([ulid()]),
	name: string(),
	type: union([literal("warlock"), literal("druid"), literal("cleric")]),
});

export type Domain = Output<typeof DomainSchema>;
