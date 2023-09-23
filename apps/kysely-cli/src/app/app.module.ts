import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';
import { ServerDeitiesModule } from '@unteris/server/deities';
import { KyselyModule } from '@unteris/server/kysely';
import { ServerLocationModule } from '@unteris/server/location';
import { ServerLoggingModule } from '@unteris/server/logging';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KyselyCliCommand } from './kysely.command';
import { SeedCommand } from './seed.command';
import { DeityCategoryQuestions } from './seeds/deity-category.questions';
import { DeityDomainQuestions } from './seeds/deity-domain.questions';
import { DeityQuestions } from './seeds/deity.questions';
import { DomainQuestions } from './seeds/domain.questions';
import { LocationQuestins } from './seeds/location.question';
import { RepeatQuestions } from './seeds/repeat.questions';
import { SeedTypeQuestions } from './seeds/seed-type.questions';

@Module({
	imports: [
		KyselyModule,
		ServerLoggingModule.forApplication('Kysely CLI', 'ALL'),
		OgmaModule.forFeatures([KyselyCliCommand, SeedCommand]),
		ServerDeitiesModule,
		ServerLocationModule,
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
		DeityDomainQuestions,
		LocationQuestins,
	],
})
export class AppModule {}
