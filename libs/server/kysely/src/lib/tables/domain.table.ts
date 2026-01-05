import * as v from "valibot";

export const DomainSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	name: v.string(),
	type: v.union([
		v.literal("warlock"),
		v.literal("cleric"),
		v.literal("druid"),
	]),
});

export type Domain = v.InferOutput<typeof DomainSchema>;
