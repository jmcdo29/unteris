import { Module } from '@nestjs/common';
import { SCHEMA } from './config.constants';
import { Config } from './config.schema';
import { ServerConfigService } from './server-config.service';

@Module({
	controllers: [],
	providers: [
		ServerConfigService,
		{
			provide: SCHEMA,
			useValue: Config,
		},
	],
	exports: [ServerConfigService],
})
export class ServerConfigModule {}
