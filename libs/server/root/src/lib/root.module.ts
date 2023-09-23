import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { OgmaInterceptor } from '@ogma/nestjs-module';
import { ServerConfigModule } from '@unteris/server/config';
import { ServerCsrfModule } from '@unteris/server/csrf';
import { ServerDeitiesModule } from '@unteris/server/deities';
import { ServerEmailModule } from '@unteris/server/email';
import { ServerLocationModule } from '@unteris/server/location';
import { ServerLoggingModule } from '@unteris/server/logging';
import { ServerRaceModule } from '@unteris/server/race';
import {
	IsLoggedInGuard,
	ServerSecurityModule,
} from '@unteris/server/security';
import {
	ServerSessionModule,
	SessionExistsGuard,
} from '@unteris/server/session';
import { ZodValidationPipe } from '@unteris/server/zod-pipe';
import { CookieModule, CookiesInterceptor } from 'nest-cookies';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseFilter } from './catch-all.filter';

@Module({
	imports: [
		CookieModule,
		ServerDeitiesModule,
		ServerLocationModule,
		ServerLoggingModule.forApplication('Unteris Server', 'DEBUG'),
		ServerCsrfModule,
		ServerSessionModule,
		ServerConfigModule,
		ServerRaceModule,
		ServerSecurityModule,
		ServerEmailModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: SessionExistsGuard,
		},
		{
			provide: APP_GUARD,
			useClass: IsLoggedInGuard,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: CookiesInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: OgmaInterceptor,
		},
		{
			provide: APP_FILTER,
			useClass: BaseFilter,
		},
		{
			provide: APP_PIPE,
			useClass: ZodValidationPipe,
		},
	],
})
export class RootModule {}
