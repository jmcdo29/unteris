import { Module, OnModuleDestroy } from '@nestjs/common';
import {
  ServerConfigModule,
  ServerConfigService,
} from '@unteris/server/config';
import { createClient, RedisClientType } from 'redis';

import {
  getInstanceToken,
  getOptionsToken,
  InjectRedisInstance,
} from './redis.constants';

@Module({
  imports: [ServerConfigModule],
  controllers: [],
  providers: [
    {
      provide: getOptionsToken(),
      useFactory: (config: ServerConfigService) => ({
        url: config.get('REDIS_URL'),
      }),
      inject: [ServerConfigService],
    },
    {
      provide: getInstanceToken(),
      useFactory: async (options) => {
        const redis = createClient(options);
        await redis.connect();
        return redis;
      },
      inject: [getOptionsToken()],
    },
  ],
  exports: [getInstanceToken()],
})
export class ServerRedisModule implements OnModuleDestroy {
  constructor(@InjectRedisInstance() private readonly redis: RedisClientType) {}
  async onModuleDestroy() {
    await this.redis.disconnect();
  }
}
