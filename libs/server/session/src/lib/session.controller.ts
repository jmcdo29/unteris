import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CacheSkip } from "@unteris/server/cache";
import type { RefreshRequest, UnterisCookies } from "@unteris/server/common";
import { sessionRoute } from "@unteris/shared/types";
import { type Cookie, Cookies, NewCookies } from "nest-cookies";
import { RefreshSessionGuard } from "./refresh-session.guard";
import { SkipSessionCheck } from "./session.decorator";
import type { ServerSessionService } from "./session.service";

@ApiTags("Security")
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
