import { Injectable } from '@nestjs/common';
import { ServerTokenService } from '@unteris/server/token';
import { InjectRedisInstance } from '@unteris/server/redis';
import { RedisClientType } from 'redis';
import { ServerConfigService } from '@unteris/server/config';

@Injectable()
export class ServerSessionService {
  constructor(
    private readonly tokenService: ServerTokenService,
    @InjectRedisInstance() private readonly redis: RedisClientType,
    private readonly config: ServerConfigService
  ) {}

  async createSession(): Promise<{ id: string; refreshId: string }> {
    const sessionToken = await this.tokenService.generateToken(128);
    const refreshToken = await this.tokenService.generateToken(256);
    await this.redis.set(sessionToken, '{}', {
      EX: this.config.get('SESSION_EXPIRES_IN'),
    });
    await this.redis.set(refreshToken, sessionToken, {
      EX: this.config.get('REFRESH_EXPIRES_IN'),
    });
    return { id: sessionToken, refreshId: refreshToken };
  }

  async updateSession(
    sessionId: string,
    sessionData: Record<string, any>
  ): Promise<void> {
    const session = JSON.parse((await this.redis.get(sessionId)) ?? '{}');
    await this.redis.set(
      sessionId,
      JSON.stringify({ ...session, ...sessionData })
    );
  }
}
