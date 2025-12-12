import { type Output, object, optional, passthrough, string } from "valibot";

const CookiesSchema = passthrough(
	object({
		refreshId: optional(string()),
		sessionId: string(),
	}),
);

export type UnterisCookies = Output<typeof CookiesSchema>;
