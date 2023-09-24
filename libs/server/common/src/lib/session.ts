import { z } from "valibot";

const SessionIdSchema = object({
	id: string(),
});

export const SessionDataSchema = object({
	user: z
		.object({
			email: string().email().optional(),
			id: string([ulid()]).optional(),
		})
		.passthrough(),
	csrf: string(),
});

export type SessionData = Output<typeof SessionDataSchema>;

const RefreshSessionDataSchema = object({
	sessionId: string(),
});

export type RefreshSessionData = Output<typeof RefreshSessionDataSchema>;

export type SavedSessionData = SessionData | RefreshSessionData;

export const SessionSchema = intersection(
	SessionIdSchema,
	union([SessionDataSchema, RefreshSessionDataSchema]),
);

export type UnterisSession = Output<typeof SessionSchema>;
