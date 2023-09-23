import { Module } from "@nestjs/common";
import { ServerImageClientModule } from "@unteris/server/image-client";
import { KyselyModule } from "@unteris/server/kysely";
import { ServerDeitiesController } from "./server-deities.controller";
import { ServerDeitiesService } from "./server-deities.service";

@Module({
	imports: [KyselyModule, ServerImageClientModule],
	controllers: [ServerDeitiesController],
	providers: [ServerDeitiesService],
	exports: [ServerDeitiesService],
})
export class ServerDeitiesModule {}
