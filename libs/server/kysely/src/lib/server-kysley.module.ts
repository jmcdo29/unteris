import { Inject, Module } from "@nestjs/common";
import {
	OgmaModule,
	OgmaService,
	createProviderToken,
} from "@ogma/nestjs-module";
import { style } from "@ogma/styler";
import {
	ServerConfigModule,
	ServerConfigService,
} from "@unteris/server/config";
import {
	CamelCasePlugin,
	Kysely,
	KyselyConfig,
	LogEvent,
	PostgresDialect,
} from "kysely";
import { Pool } from "pg";
import {
	getKyselyConfigToken,
	getKyselyInstanceToken,
} from "./kysely.constants";

@Module({
	imports: [ServerConfigModule, OgmaModule.forFeature("Kysely")],
	controllers: [],
	providers: [
		{
			provide: getKyselyConfigToken(),
			inject: [ServerConfigService, createProviderToken("Kysely")],
			useFactory: (
				config: ServerConfigService,
				logger: OgmaService,
			): KyselyConfig => {
				try {
					logger.silly(
						{
							host: config.get("DATABASE_HOST"),
							port: config.get("DATABASE_PORT"),
							database: config.get("DATABASE_NAME"),
							user: config.get("DATABASE_USER"),
							password: config.get("DATABASE_PASSWORD"),
						},
						{ context: "PG Pool" },
					);
					const dbConfig = {
						dialect: new PostgresDialect({
							pool: new Pool({
								host: config.get("DATABASE_HOST"),
								port: config.get("DATABASE_PORT"),
								database: config.get("DATABASE_NAME"),
								user: config.get("DATABASE_USER"),
								password: config.get("DATABASE_PASSWORD"),
							}),
						}),
						log: (event: LogEvent) => {
							logger.silly({
								message: "Kysely Config",
								query: event.query.query,
							});
							logger.debug({
								message: "Running Query",
								parameters: event.query.parameters,
								raw: event.query.sql,
							});
							if (event.level === "query") {
								logger.verbose({
									message: "Query Timing",
									duration: event.queryDurationMillis,
								});
							}
							if (event.level === "error") {
								logger.error({
									message: "Error running query",
									error: event.error,
								});
							}
						},
						plugins: [new CamelCasePlugin()],
					};
					logger.debug(
						`Connecting to database ${style.blue.apply(
							config.get("DATABASE_NAME"),
						)} on host ${style.magenta.apply(config.get("DATABASE_HOST"))}`,
					);
					return dbConfig;
				} catch (e) {
					if (e instanceof Error) {
						logger.printError(e);
					}
					throw e;
				}
			},
		},
		{
			provide: getKyselyInstanceToken(),
			useFactory: (config: KyselyConfig) => {
				return new Kysely(config);
			},
			inject: [getKyselyConfigToken()],
		},
	],
	exports: [getKyselyInstanceToken()],
})
export class KyselyModule {
	constructor(
		@Inject(getKyselyInstanceToken())
		private readonly kysely: Kysely<Record<string, Record<string, unknown>>>,
	) {}

	async onModuleDestroy() {
		await this.kysely.destroy();
	}
}
