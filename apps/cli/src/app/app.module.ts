import { Module } from "@nestjs/common";
import { OgmaModule } from "@ogma/nestjs-module";
import { ServerDeitiesModule } from "@unteris/server/deities";
import { KyselyModule } from "@unteris/server/kysely";
import { ServerLocationModule } from "@unteris/server/location";
import { ServerLoggingModule } from "@unteris/server/logging";

import { KyselyCliCommand } from "./kysely.command";
import { SeedCommand } from "./seed.command";
import { DeityCategoryQuestions } from "./seeds/deity-category.questions";
import { DeityDomainQuestions } from "./seeds/deity-domain.questions";
import { DeityQuestions } from "./seeds/deity.questions";
import { DomainQuestions } from "./seeds/domain.questions";
import { LocationQuestions } from "./seeds/location.question";
import { RepeatQuestions } from "./seeds/repeat.questions";
import { SeedTypeQuestions } from "./seeds/seed-type.questions";
import { FullSeedCommand } from "./full-seed.command";

@Module({
	imports: [
		KyselyModule,
		ServerLoggingModule.forApplication("CLI", "DEBUG"),
		OgmaModule.forFeatures([KyselyCliCommand, SeedCommand, FullSeedCommand]),
		ServerDeitiesModule,
		ServerLocationModule,
	],
	providers: [
		KyselyCliCommand,
		SeedCommand,
		DeityQuestions,
		DeityCategoryQuestions,
		DomainQuestions,
		SeedTypeQuestions,
		RepeatQuestions,
		DeityDomainQuestions,
		LocationQuestions,
		FullSeedCommand,
	],
})
export class AppModule {}
