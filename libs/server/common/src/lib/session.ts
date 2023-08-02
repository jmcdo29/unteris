import { z } from 'zod';

const SessionIdSchema = z.object({
  id: z.string(),
});

export const SessionDataSchema = z.object({
  user: z.object({}).passthrough(),
  csrf: z.string(),
});

export type SessionData = z.infer<typeof SessionDataSchema>;

const RefreshSessionDataSchema = z.object({
  sessionId: z.string(),
});

export type RefreshSessionData = z.infer<typeof RefreshSessionDataSchema>;

export type SavedSessionData = SessionData | RefreshSessionData;

export const SessionSchema = z.intersection(
  SessionIdSchema,
  z.union([SessionDataSchema, RefreshSessionDataSchema])
);

export type UnterisSession = z.infer<typeof SessionSchema>;
