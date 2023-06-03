import { ForbiddenException, Injectable } from '@nestjs/common';
import { ServerConfigService } from '@unteris/server/config';
import { InjectRedisInstance } from '@unteris/server/redis';
import { ServerTokenService } from '@unteris/server/token';
import { RedisClientType } from 'redis';
import {
  RefreshSessionData,
  SavedSessionData,
  SessionData,
} from './session.interface';

@Injectable()
export class ServerSessionService {
  constructor(
    private readonly tokenService: ServerTokenService,
    @InjectRedisInstance() private readonly redis: RedisClientType,
    private readonly config: ServerConfigService
  ) {}

  async createSession(
    sessionData: SessionData = { user: {}, csrf: '' }
  ): Promise<{ id: string; refreshId: string }> {
    const sessionToken = await this.tokenService.generateToken(128);
    const refreshToken = await this.tokenService.generateToken(256);
    await this.redis.set(sessionToken, JSON.stringify(sessionData), {
      EX: this.config.get('SESSION_EXPIRES_IN'),
    });
    await this.redis.set(refreshToken, sessionToken, {
      EX: this.config.get('REFRESH_EXPIRES_IN'),
    });
    return { id: sessionToken, refreshId: refreshToken };
  }

  async getSession(sessionId?: string): Promise<SavedSessionData | object> {
    if (!sessionId) {
      return {};
    }
    return JSON.parse((await this.redis.get(sessionId)) ?? '{}');
  }

  async updateSession(
    sessionId: string,
    sessionData: Partial<SessionData | RefreshSessionData>
  ): Promise<void> {
    const session = await this.getSession(sessionId);
    if (!this.isSavedSession(session)) {
      throw new ForbiddenException();
    }
    await this.redis.set(
      sessionId,
      JSON.stringify({ ...session, ...sessionData })
    );
  }

  private isSavedSession<T extends object = SavedSessionData>(
    sessionObject: T | object
  ): sessionObject is T {
    return Object.keys(sessionObject).length !== 0;
  }

  isSession(
    sessionData: SavedSessionData | object
  ): sessionData is SessionData {
    return 'user' in sessionData && 'csrf' in sessionData;
  }
}
