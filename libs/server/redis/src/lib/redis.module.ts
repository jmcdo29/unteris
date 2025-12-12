import { Module, type OnModuleDestroy } from "@nestjs/common";
import {
	createProviderToken,
	OgmaModule,
	type OgmaService,
} from "@ogma/nestjs-module";
import { style } from "@ogma/styler";
import {
	ServerConfigModule,
	ServerConfigService,
} from "@unteris/server/config";
import {
	createClient,
	type RedisClientOptions,
	type RedisClientType,
} from "redis";

import {
	getInstanceToken,
	getOptionsToken,
	InjectRedisInstance,
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
				const redisUrl = new URL(options.url ?? "");
				const redis = createClient(options);
				redis.on("connect", () => {
					logger.debug(
						`${style.yellow.apply(
							"Connecting",
						)} to redis at ${style.magenta.apply(`${redisUrl.host}`)}`,
					);
				});
				redis.on("ready", () => {
					logger.debug(
						`${style.green.apply(
							"Connected",
						)} to redis at ${style.magenta.apply(`${redisUrl.host}`)}`,
					);
				});
				redis.on("reconnecting", () => {
					logger.debug(
						`${style.yellow.apply(
							"Reconnecting",
						)} to redis at ${style.magenta.apply(
							`${redisUrl.host}:${redisUrl.port}`,
						)}`,
					);
				});
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
