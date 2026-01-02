import {
	BadRequestException,
	ForbiddenException,
	Injectable,
} from "@nestjs/common";
import type {
	RefreshSessionData,
	ReqMetaType,
	SavedSessionData,
	SessionData,
} from "@unteris/server/common";
import { ServerConfigService } from "@unteris/server/config";
import { Database } from "@unteris/server/kysely";
import { InjectRedisInstance } from "@unteris/server/redis";
import { ServerTokenService } from "@unteris/server/token";
import type { Cookie } from "nest-cookies";
import type { RedisClientType } from "redis";
import * as v from "valibot";
import { SessionRepository } from "./session.repository";

@Injectable()
export class ServerSessionService {
	private readonly domain: string;
	constructor(
		private readonly tokenService: ServerTokenService,
		@InjectRedisInstance() private readonly redis: RedisClientType,
		private readonly config: ServerConfigService,
		private readonly repo: SessionRepository,
	) {
		this.domain = new URL(config.get("CORS")).hostname;
	}

	async createSessionId() {
		return this.tokenService.generateToken(128);
	}

	async createRefreshId() {
		return this.tokenService.generateToken(256);
	}

	async createFullSession(
		sessionData: Omit<Database["userSession"], "id">,
	): Promise<{ id: string; refreshId: string }> {
		const sessionToken = await this.createSessionId();
		const refreshToken = await this.createRefreshId();
		await this.createSession(sessionData, sessionToken);
		await this.redis.set(
			refreshToken,
			JSON.stringify({ sessionId: sessionToken }),
			{
				EX: this.config.get("REFRESH_EXPIRES_IN"),
			},
		);
		return { id: sessionToken, refreshId: refreshToken };
	}

	async createSession(
		sessionData: Omit<Database["userSession"], "id">,
		sessionId?: string,
	): Promise<{ id: string }> {
		let id = sessionId;
		if (!id) {
			id = await this.createSessionId();
		}
		await this.repo.createOne({ ...sessionData, id });
		return { id };
	}

	async getSession(sessionId: string): Promise<SessionData> {
		const session = await this.repo.getById(sessionId);
		await this.repo.setLastUsedTime(sessionId);
		return session;
	}

	async getRefreshData(refreshId: string): Promise<RefreshSessionData> {
		const rawData = await this.redis.get(refreshId);
		if (!rawData) {
			throw new Error(`Invalid refreshId`);
		}
		const refreshData = JSON.parse(rawData);
		if (!("sessionId" in refreshData)) {
			throw new Error("Invalid refreshId");
		}
		return refreshData;
	}

	async updateSession<T extends "session" | "refresh" = "session">(
		sessionId: string,
		sessionData: Partial<
			T extends "session" ? SessionData : RefreshSessionData
		>,
	): Promise<void> {
		const session = await this.getSession(sessionId);
		if (!this.isSavedSession(session)) {
			throw new ForbiddenException();
		}
		await this.redis.set(
			sessionId,
			JSON.stringify({ ...session, ...sessionData }),
		);
	}

	async refreshSession(
		oldRefreshId: string,
		meta: ReqMetaType,
	): Promise<{ refreshId: string; sessionId: string }> {
		const rawRefreshData = await this.redis.get(oldRefreshId);
		if (rawRefreshData === null) {
			throw new BadRequestException("Invalid refresh id");
		}
		const refreshData = v.parse(
			v.object({ sessionId: v.string() }),
			JSON.parse(rawRefreshData),
		);

		const previousSessionData = await this.repo.getFullById(
			refreshData.sessionId,
		);

		const matches = [
			previousSessionData.browserType === meta.userAgent,
			previousSessionData.ipAddress === meta.ip,
			previousSessionData.operatingSystem === meta.operatingSystem,
		].filter((val) => !!val);

		if (matches.length < 2) {
			throw new ForbiddenException("Please log in to continue");
		}

		const res = await this.createFullSession({
			userId: previousSessionData.userId,
			browserType: meta.userAgent,
			operatingSystem: meta.operatingSystem,
			ipAddress: meta.ip,
		});

		await this.repo.deleteOne(previousSessionData.id);
		await this.redis.del(oldRefreshId);

		return { refreshId: res.refreshId, sessionId: res.id };
	}

	async destroySession(sessionId: string): Promise<boolean> {
		return await this.repo.deleteOne(sessionId);
	}

	private isSavedSession<T extends object = SavedSessionData>(
		sessionObject: T | object,
	): sessionObject is T {
		return Object.keys(sessionObject).length !== 0;
	}

	isSession(
		sessionData: SavedSessionData | object,
	): sessionData is SessionData {
		return "user" in sessionData;
	}

	isRefreshData(
		refreshData: SavedSessionData | object,
	): refreshData is RefreshSessionData {
		return "sessionId" in refreshData;
	}

	createCookie({
		name,
		value,
		options = {},
	}: {
		name: "session" | "refresh";
		value: string | number;
		options?: Cookie["options"];
	}): Cookie {
		const cookie: Required<Cookie> = {
			name: `${name}Id`,
			value,
			options: {
				maxAge: this.config.get(
					`${name.toUpperCase() as Uppercase<typeof name>}_EXPIRES_IN`,
				),
				httpOnly: true,
				path: "/",
				sameSite: "Strict" as const,
				domain: this.domain,
				...options,
			},
		};
		if (this.config.get("NODE_ENV") === "production") {
			cookie.options.secure = true;
		}
		return cookie;
	}
}
