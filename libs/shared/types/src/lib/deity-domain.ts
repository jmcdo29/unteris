import { type Output, object, string, ulid } from "valibot";

export const DeityDomainSchema = object({
	deityId: string([ulid()]),
	domainId: string([ulid()]),
});

export type DeityDomain = Output<typeof DeityDomainSchema>;
