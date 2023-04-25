import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OgmaModule, OgmaInterceptor } from '@ogma/nestjs-module';
import { ExpressParser } from '@ogma/platform-express';
import { ServerDeitiesModule } from '@unteris/server/deities';
import { ServerLocationModule } from '@unteris/server/location';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ServerDeitiesModule,
    ServerLocationModule,
    OgmaModule.forRoot({
      service: {
        application: 'Unteris Server',
        logLevel: 'ALL',
      },
      interceptor: {
        http: ExpressParser,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: OgmaInterceptor,
    },
  ],
})
export class AppModule {}
