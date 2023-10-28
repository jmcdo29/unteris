import { Controller, Get, Post, Session, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UnterisSession } from "@unteris/server/common";
import { SkipSessionCheck } from "@unteris/server/session";
import { csrfRoute } from "@unteris/shared/types";
import { CsrfGuard } from "./csrf.guard";
import { ServerCsrfService } from "./csrf.service";

@ApiTags("Security")
@Controller(csrfRoute)
@SkipSessionCheck()
export class ServerCsrfController {
	constructor(private serverCsrfService: ServerCsrfService) {}
	@Get()
	async getCsrfToken(
		@Session() session: UnterisSession,
	): Promise<{ csrfToken: string }> {
		return {
			csrfToken: await this.serverCsrfService.generateToken(session.id),
		};
	}

	@Post("verify")
	@UseGuards(CsrfGuard)
	verifyCsrf() {
		return { success: true };
	}
}
