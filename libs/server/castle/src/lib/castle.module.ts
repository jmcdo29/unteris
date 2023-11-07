import { Module } from "@nestjs/common";
import { ServerCastleService } from "./castle.service";

@Module({
	controllers: [],
	providers: [ServerCastleService],
	exports: [ServerCastleService],
})
export class ServerCastleModule {}
