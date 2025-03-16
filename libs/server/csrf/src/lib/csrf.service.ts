import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRedisInstance } from "@unteris/server/redis";
import type { ServerSessionService } from "@unteris/server/session";
import type { ServerTokenService } from "@unteris/server/token";
import type { RedisClientType } from "redis";

@Injectable()
export class ServerCsrfService {
	constructor(
		private readonly tokenService: ServerTokenService,
		private readonly sessionService: ServerSessionService,
		@InjectRedisInstance() private readonly redis: RedisClientType,
	) {}
	async generateToken(sessionId: string, ip: string): Promise<string> {
		const csrfSessionValue = await this.redis.get(`csrf:${ip}`);
		if (csrfSessionValue) {
			return csrfSessionValue;
		}
		const csrfToken = await this.tokenService.generateToken(256);
		await this.redis.setEx(`csrf:${ip}`, 24 * 60 * 60, csrfToken);
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
