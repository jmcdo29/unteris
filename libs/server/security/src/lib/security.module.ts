import { Module } from "@nestjs/common";
import { OgmaModule } from "@ogma/nestjs-module";
import { ServerCryptModule } from "@unteris/server/crypt";
import { ServerEmailModule } from "@unteris/server/email";
import { ServerHashModule } from "@unteris/server/hash";
import { KyselyModule } from "@unteris/server/kysely";
import { ServerSessionModule } from "@unteris/server/session";
import { ServerTokenModule } from "@unteris/server/token";
import { IsLoggedInGuard } from "./is-logged-in.guard";
import { ServerSecurityController } from "./security.controller";
import { SecurityRepo } from "./security.repository";
import { ServerSecurityService } from "./security.service";

@Module({
	imports: [
		KyselyModule,
		ServerSessionModule,
		ServerHashModule,
		ServerEmailModule,
		ServerTokenModule,
		OgmaModule.forFeature(ServerSecurityService),
		ServerCryptModule,
	],
	controllers: [ServerSecurityController],
	providers: [ServerSecurityService, SecurityRepo, IsLoggedInGuard],
	exports: [ServerSecurityService, IsLoggedInGuard],
})
export class ServerSecurityModule {}
