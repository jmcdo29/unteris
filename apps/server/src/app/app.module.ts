import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ServerCsrfModule } from '@unteris/server/csrf';
import { ServerDeitiesModule } from '@unteris/server/deities';
import { ServerLocationModule } from '@unteris/server/location';
import { ServerLoggingModule } from '@unteris/server/logging';
import { ServerSessionModule } from '@unteris/server/session';
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CookiesInterceptor,
    },
  ],
})
export class AppModule {}
