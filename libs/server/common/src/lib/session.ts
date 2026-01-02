import {
	email,
	type Output,
	object,
	optional,
	passthrough,
	string,
	ulid,
	union,
} from "valibot";

export const SessionDataSchema = object({
	id: string(),
	user: passthrough(
		object({
			email: optional(string([email()])),
			id: optional(string([ulid()])),
		}),
	),
});

export type SessionData = Output<typeof SessionDataSchema>;

const RefreshSessionDataSchema = object({
	id: string(),
	sessionId: string(),
});

export type RefreshSessionData = Omit<
	Output<typeof RefreshSessionDataSchema>,
	"id"
>;

const SavedSessionDataSchema = union([
	SessionDataSchema,
	RefreshSessionDataSchema,
]);

export type UnterisSession = Output<typeof SavedSessionDataSchema>;
export type SavedSessionData = Omit<UnterisSession, "id">;
