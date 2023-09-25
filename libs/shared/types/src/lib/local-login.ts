import {
	Output,
	fallback,
	isoDateTime,
	number,
	object,
	optional,
	string,
	ulid,
} from "valibot";

export const LocalLoginSchema = object({
	id: string([ulid()]),
	password: string(),
	loginMethodId: string([ulid()]),
	lastUsed: optional(string([isoDateTime()])),
	attempts: fallback(number(), 0),
});

export type LocalLogin = Output<typeof LocalLoginSchema>;
