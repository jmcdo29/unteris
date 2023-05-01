import { DynamicModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OgmaOptions } from '@ogma/logger';
import { OgmaModule, OgmaInterceptor } from '@ogma/nestjs-module';
import { ExpressParser } from '@ogma/platform-express';
import {
  ServerConfigModule,
  ServerConfigService,
} from '@unteris/server/config';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: OgmaInterceptor,
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
            service: {
              application: app,
              logLevel: logLevel,
              json: config.get('NODE_ENV') === 'production',
            },
            interceptor: {
              http: ExpressParser,
            },
          }),
          inject: [ServerConfigService],
        }),
      ],
    };
  }
}
