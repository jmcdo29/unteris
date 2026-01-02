import { ValidationPipe } from "@nest-lab/typeschema";
import { Module } from "@nestjs/common";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { OgmaInterceptor } from "@ogma/nestjs-module";
import { CacheInterceptor, ServerCacheModule } from "@unteris/server/cache";
import { ServerConfigModule } from "@unteris/server/config";
import { ServerDeitiesModule } from "@unteris/server/deities";
import { ServerEmailModule } from "@unteris/server/email";
import { ServerLocationModule } from "@unteris/server/location";
import { ServerLoggingModule } from "@unteris/server/logging";
import { ServerRaceModule } from "@unteris/server/race";
import {
	IsLoggedInGuard,
	ServerSecurityModule,
} from "@unteris/server/security";
import { ServerSessionModule } from "@unteris/server/session";
import { CookieModule, CookiesInterceptor } from "nest-cookies";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BaseFilter } from "./catch-all.filter";

@Module({
	imports: [
		ServerCacheModule,
		CookieModule,
		ServerDeitiesModule,
		ServerLocationModule,
		ServerLoggingModule.forApplication("Unteris Server", "DEBUG"),
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
			useExisting: IsLoggedInGuard,
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
			provide: APP_INTERCEPTOR,
			useClass: CacheInterceptor,
		},
		{
			provide: APP_FILTER,
			useClass: BaseFilter,
		},
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
	],
})
export class RootModule {}
