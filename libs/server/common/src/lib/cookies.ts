import { z } from 'zod';

const CookiesSchema = z
	.object({
		refreshId: z.string().optional(),
		sessionId: z.string(),
	})
	.passthrough();

export type UnterisCookies = z.infer<typeof CookiesSchema>;
