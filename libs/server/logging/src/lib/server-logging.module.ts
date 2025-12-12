import { type DynamicModule, Module } from "@nestjs/common";
import type { OgmaOptions } from "@ogma/logger";
import { OgmaModule } from "@ogma/nestjs-module";
import { ExpressParser } from "@ogma/platform-express";
import {
	ServerConfigModule,
	ServerConfigService,
} from "@unteris/server/config";

@Module({})
export class ServerLoggingModule {
	static forApplication(
		app: string,
		logLevel: OgmaOptions["logLevel"] = "INFO",
	): DynamicModule {
		return {
			module: ServerLoggingModule,
			imports: [
				OgmaModule.forRootAsync({
					imports: [ServerConfigModule],
					useFactory: (_config: ServerConfigService) => ({
						application: app,
						logLevel: logLevel,
					}),
					inject: [ServerConfigService],
				}),
			],
			providers: [ExpressParser],
		};
	}
}
