import { z } from "valibot";

const CookiesSchema = z
	.object({
		refreshId: optional(string())(),
		sessionId: string(),
	})
	.passthrough();

export type UnterisCookies = Output<typeof CookiesSchema>;
