import { DynamicModule, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { OgmaOptions } from '@ogma/logger';
import { OgmaModule, OgmaInterceptor } from '@ogma/nestjs-module';
import { ExpressParser } from '@ogma/platform-express';
import {
  ServerConfigModule,
  ServerConfigService,
} from '@unteris/server/config';
import { BaseFilter } from './catch-all.filter';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: OgmaInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: BaseFilter,
    },
  ],
  exports: [],
})
export class ServerLoggingModule {
  static forApplication(
    app: string,
    logLevel: OgmaOptions['logLevel'] = 'INFO'
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
