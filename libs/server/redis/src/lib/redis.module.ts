import { Module, OnModuleDestroy } from '@nestjs/common';
import {
  createProviderToken,
  OgmaModule,
  OgmaService,
} from '@ogma/nestjs-module';
import {
  ServerConfigModule,
  ServerConfigService,
} from '@unteris/server/config';
import { createClient, RedisClientOptions, RedisClientType } from 'redis';

import {
  getInstanceToken,
  getOptionsToken,
  InjectRedisInstance,
} from './redis.constants';

@Module({
  imports: [ServerConfigModule, OgmaModule.forFeature('Redis')],
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
      useFactory: async (options: RedisClientOptions, logger: OgmaService) => {
        try {
          const redis = createClient(options);
          await redis.connect();
          return redis;
        } catch (e) {
          if (e instanceof Error) {
            logger.printError(e);
          }
          throw e;
        }
      },
      inject: [getOptionsToken(), createProviderToken('Redis')],
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
