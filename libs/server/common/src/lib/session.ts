import {
	Output,
	array,
	email,
	merge,
	object,
	optional,
	passthrough,
	string,
	ulid,
	union,
} from "valibot";
import { RoleEnumSchema } from "./role.enum";

export const SessionDataSchema = object({
	id: string(),
	user: passthrough(
		object({
			email: optional(string([email()])),
			id: optional(string([ulid()])),
			roles: optional(array(RoleEnumSchema)),
		}),
	),
	csrf: string(),
});

export type SessionData = Omit<Output<typeof SessionDataSchema>, "id">;

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
