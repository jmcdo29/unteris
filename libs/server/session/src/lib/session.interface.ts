export interface SessionData {
  user: Record<string, unknown>;
  csrf: string;
}

export interface RefreshSessionData {
  sessionId: string;
}

export type SavedSessionData = SessionData | RefreshSessionData;
