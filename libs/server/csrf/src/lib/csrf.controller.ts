import { Controller, Get, Post, Session, UseGuards } from '@nestjs/common';
import { UnterisSession } from '@unteris/server/common';
import { SkipSessionCheck } from '@unteris/server/session';
import { CsrfGuard } from './csrf.guard';
import { ServerCsrfService } from './csrf.service';

@Controller('csrf')
@SkipSessionCheck()
export class ServerCsrfController {
	constructor(private serverCsrfService: ServerCsrfService) {}
	@Get()
	async getCsrfToken(
		@Session() session: UnterisSession
	): Promise<{ csrfToken: string }> {
		return {
			csrfToken: await this.serverCsrfService.generateToken(session.id),
		};
	}

	@Post('verify')
	@UseGuards(CsrfGuard)
	verifyCsrf() {
		return { success: true };
	}
}
