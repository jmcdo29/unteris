import { ForbiddenException, Injectable } from "@nestjs/common";
import { ServerSessionService } from "@unteris/server/session";
import { ServerTokenService } from "@unteris/server/token";

@Injectable()
export class ServerCsrfService {
	constructor(
		private readonly tokenService: ServerTokenService,
		private readonly sessionService: ServerSessionService,
	) {}
	async generateToken(sessionId: string): Promise<string> {
		const csrfToken = await this.tokenService.generateToken(256);
		await this.sessionService.updateSession(sessionId, {
			csrf: csrfToken,
		});
		return csrfToken;
	}

	async verifyCsrfToken({
		sessionId,
		csrfToken,
	}: {
		sessionId: string;
		csrfToken: string;
	}): Promise<boolean> {
		const sessionData = await this.sessionService.getSession(sessionId);
		if (!this.sessionService.isSession(sessionData)) {
			throw new ForbiddenException("Invalid session data");
		}
		const { csrf } = sessionData;
		return csrf === csrfToken;
	}
}
