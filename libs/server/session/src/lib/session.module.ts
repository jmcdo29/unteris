import { Module } from "@nestjs/common";
import { ServerConfigModule } from "@unteris/server/config";
import { ServerCryptModule } from "@unteris/server/crypt";
import { KyselyModule } from "@unteris/server/kysely";
import { ServerRedisModule } from "@unteris/server/redis";
import { ServerTokenModule } from "@unteris/server/token";
import { SessionRepository } from "./session.repository";
import { ServerSessionService } from "./session.service";

@Module({
	imports: [
		KyselyModule,
		ServerRedisModule,
		ServerConfigModule,
		ServerTokenModule,
		ServerCryptModule,
	],
	providers: [ServerSessionService, SessionRepository],
	exports: [ServerSessionService],
})
export class ServerSessionModule {}
