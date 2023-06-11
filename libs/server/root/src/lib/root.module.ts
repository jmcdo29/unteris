import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ServerConfigModule } from '@unteris/server/config';
import { ServerCsrfModule } from '@unteris/server/csrf';
import { ServerDeitiesModule } from '@unteris/server/deities';
import { ServerLocationModule } from '@unteris/server/location';
import { ServerLoggingModule } from '@unteris/server/logging';
import { ServerRaceModule } from '@unteris/server/race';
import {
  ServerSessionModule,
  SessionExistsGuard,
} from '@unteris/server/session';
import { CookieModule, CookiesInterceptor } from 'nest-cookies';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: SessionExistsGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CookiesInterceptor,
    },
  ],
})
export class RootModule {}
