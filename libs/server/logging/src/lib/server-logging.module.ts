import { DynamicModule, Module } from '@nestjs/common';
import { OgmaOptions } from '@ogma/logger';
import { OgmaModule } from '@ogma/nestjs-module';
import { ExpressParser } from '@ogma/platform-express';
import {
	ServerConfigModule,
	ServerConfigService,
} from '@unteris/server/config';

@Module({
	imports: [],
	controllers: [],
	providers: [],
	exports: [],
})
export class ServerLoggingModule {
	static forApplication(
		app: string,
		logLevel: OgmaOptions['logLevel'] = 'INFO',
	): DynamicModule {
		return {
			module: ServerLoggingModule,
			imports: [
				OgmaModule.forRootAsync({
					imports: [ServerConfigModule],
					useFactory: (config: ServerConfigService) => ({
						application: app,
						logLevel: logLevel,
						json: config.get('NODE_ENV') === 'production',
					}),
					inject: [ServerConfigService],
				}),
			],
			providers: [ExpressParser],
		};
	}
}
