import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';
import { KyselyModule } from '@unteris/server/kysely';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KyselyCliCommand } from './kysely.command';

@Module({
  imports: [
    KyselyModule,
    OgmaModule.forRoot({
      service: {
        application: 'Kysely CLI',
      },
      interceptor: false,
    }),
    OgmaModule.forFeature(KyselyCliCommand),
  ],
  controllers: [AppController],
  providers: [AppService, KyselyCliCommand],
})
export class AppModule {}
