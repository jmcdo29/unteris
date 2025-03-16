<<<<<<< HEAD
import * as v from "valibot";
=======
import {
	type Output,
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
>>>>>>> 6631869 (chore: update code for biome rules)

export const SessionDataSchema = v.object({
	id: v.string(),
	user: v.looseObject({
		email: v.optional(v.pipe(v.string(), v.email())),
		id: v.optional(v.pipe(v.string(), v.ulid())),
	}),
});

export type SessionData = v.InferOutput<typeof SessionDataSchema>;

const RefreshSessionDataSchema = v.object({
	id: v.string(),
	sessionId: v.string(),
});

export type RefreshSessionData = Omit<
	v.InferOutput<typeof RefreshSessionDataSchema>,
	"id"
>;

const SavedSessionDataSchema = v.union([
	SessionDataSchema,
	RefreshSessionDataSchema,
]);

export type UnterisSession = v.InferOutput<typeof SavedSessionDataSchema>;
export type SavedSessionData = Omit<UnterisSession, "id">;
