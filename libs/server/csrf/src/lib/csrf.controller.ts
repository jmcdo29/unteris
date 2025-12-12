import { Controller, Get, Ip, Post, Session, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CacheSkip } from "@unteris/server/cache";
import { UnterisSession } from "@unteris/server/common";
import { SkipSessionCheck } from "@unteris/server/session";
import { type CsrfReturn, csrfRoute } from "@unteris/shared/types";
import { CsrfGuard } from "./csrf.guard";
import { ServerCsrfService } from "./csrf.service";

@ApiTags("Security")
@Controller(csrfRoute)
@SkipSessionCheck()
export class ServerCsrfController {
	constructor(private serverCsrfService: ServerCsrfService) {}
	@CacheSkip()
	@Get()
	async getCsrfToken(
		@Session() session: UnterisSession,
		@Ip() ip: string,
	): Promise<CsrfReturn> {
		return {
			csrfToken: await this.serverCsrfService.generateToken(session.id, ip),
		};
	}

	@Post("verify")
	@UseGuards(CsrfGuard)
	verifyCsrf() {
		return { success: true };
	}
}
