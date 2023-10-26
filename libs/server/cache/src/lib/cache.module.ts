import { CacheManagerOptions, CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ServerRedisModule, getInstanceToken } from "@unteris/server/redis";
import { redisInsStore } from "cache-manager-redis-yet";
import { RedisClientType } from "redis";

@Module({
	imports: [
		CacheModule.registerAsync({
			inject: [getInstanceToken()],
			useFactory: (redis: RedisClientType): CacheManagerOptions => {
				return {
					store: redisInsStore(
						redis as unknown as Parameters<typeof redisInsStore>[0],
						{
							ttl: 60 * 60 * 1000,
						},
					),
				};
			},
			imports: [ServerRedisModule],
		}),
	],
})
export class ServerCacheModule {}
