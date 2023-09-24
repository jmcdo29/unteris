import { Module, OnModuleDestroy } from "@nestjs/common";
import {
	OgmaModule,
	OgmaService,
	createProviderToken,
} from "@ogma/nestjs-module";
import {
	ServerConfigModule,
	ServerConfigService,
} from "@unteris/server/config";
import { RedisClientOptions, RedisClientType, createClient } from "redis";

import {
	InjectRedisInstance,
	getInstanceToken,
	getOptionsToken,
} from "./redis.constants";

@Module({
	imports: [ServerConfigModule, OgmaModule.forFeature("Redis")],
	controllers: [],
	providers: [
		{
			provide: getOptionsToken(),
			useFactory: (config: ServerConfigService) => ({
				url: config.get("REDIS_URL"),
			}),
			inject: [ServerConfigService],
		},
		{
			provide: getInstanceToken(),
			useFactory: async (options: RedisClientOptions, logger: OgmaService) => {
				logger.debug(options, { context: "REDIS" });
				const redis = createClient(options);
				redis.once("error", (err) => {
					if (err instanceof Error) {
						logger.printError(err);
					}
				});
				await redis.connect();
				return redis;
			},
			inject: [getOptionsToken(), createProviderToken("Redis")],
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
