import * as v from "valibot";

export const DeityDomainSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	deityId: v.pipe(v.string(), v.ulid()),
	domainId: v.pipe(v.string(), v.ulid()),
});

export type DeityDomain = v.InferOutput<typeof DeityDomainSchema>;
