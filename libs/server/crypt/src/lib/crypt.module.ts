import { Module } from "@nestjs/common";
import { ServerConfigModule } from "@unteris/server/config";
import { ServerCryptService } from "./crypt.service";

@Module({
	imports: [ServerConfigModule],
	providers: [ServerCryptService],
	exports: [ServerCryptService],
})
export class ServerCryptModule {}
