import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { CacheSkip } from "@unteris/server/cache";
import { RefreshRequest, UnterisCookies } from "@unteris/server/common";
import { sessionRoute } from "@unteris/shared/types";
import { Cookie, Cookies, NewCookies } from "nest-cookies";
import { RefreshSessionGuard } from "./refresh-session.guard";
import { SkipSessionCheck } from "./session.decorator";
import { ServerSessionService } from "./session.service";

@Controller(sessionRoute)
export class SessionController {
	constructor(private readonly sessionService: ServerSessionService) {}
	@Get("refresh")
	@UseGuards(RefreshSessionGuard)
	@CacheSkip()
	@SkipSessionCheck()
	async refreshSession(
		@Cookies() cookies: UnterisCookies,
		@NewCookies() newCookies: Cookie[],
		@Req()
		{ oldSession }: RefreshRequest,
	) {
		const { refreshId } = cookies;
		const sessionId = await this.sessionService.createSessionId();
		await this.sessionService.createSession(oldSession, sessionId);
		await this.sessionService.updateSession<"refresh">(refreshId ?? "", {
			sessionId,
		});
		newCookies.push(
			this.sessionService.createCookie({
				name: "session",
				value: sessionId,
			}),
		);
		return { success: true };
	}
}
