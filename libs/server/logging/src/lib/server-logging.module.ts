import { DynamicModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OgmaOptions } from '@ogma/logger';
import { OgmaModule, OgmaInterceptor } from '@ogma/nestjs-module';
import { ExpressParser } from '@ogma/platform-express';
import {
  ServerConfigModule,
  ServerConfigService,
} from '@unteris/server/config';
import { StreamService } from './stream.service';
import { StreamModule } from './stream/stream.module';

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
          imports: [StreamModule, ServerConfigModule],
          useFactory: (
            streamService: StreamService,
            config: ServerConfigService
          ) => ({
            service: {
              application: app,
              logLevel: logLevel,
              json: config.get('NODE_ENV') === 'production',
              stream:
                config.get('NODE_ENV') === 'production'
                  ? streamService.getStream()
                  : (process.stdout as { write: (message: unknown) => void }),
            },
            interceptor: {
              http: ExpressParser,
            },
          }),
          inject: [StreamService, ServerConfigService],
        }),
      ],
    };
  }
}
