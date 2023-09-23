import { Module } from "@nestjs/common";
import { ServerSessionModule } from "@unteris/server/session";
import { ServerTokenModule } from "@unteris/server/token";
import { ServerCsrfController } from "./csrf.controller";
import { ServerCsrfService } from "./csrf.service";

@Module({
	imports: [ServerTokenModule, ServerSessionModule],
	controllers: [ServerCsrfController],
	providers: [ServerCsrfService],
	exports: [ServerCsrfService],
})
export class ServerCsrfModule {}
