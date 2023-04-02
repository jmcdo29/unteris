import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';
import { KyselyModule } from '@unteris/server/kysely';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KyselyCliCommand } from './kysely.command';
import { SeedCommand } from './seed.command';
import { DeityCategoryQuestions } from './seeds/deity-category.questions';
import { DeityQuestions } from './seeds/deity.questions';
import { DomainQuestions } from './seeds/domain.questions';
import { RepeatQuestions } from './seeds/repeat.questions';
import { SeedTypeQuestions } from './seeds/seed-type.questions';

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
  providers: [
    AppService,
    KyselyCliCommand,
    SeedCommand,
    DeityQuestions,
    DeityCategoryQuestions,
    DomainQuestions,
    SeedTypeQuestions,
    RepeatQuestions,
  ],
})
export class AppModule {}
