import { Module } from "@nestjs/common";
import {
	ServerConfigModule,
	ServerConfigService,
} from "@unteris/server/config";
import type { LocalStoreConfig } from "./file-manager.interface";
import {
	FILE_LOCAL_CONFIG_TOKEN,
	FILE_STORE_TOKEN,
} from "./file-storage.constants";
import { ServerFileStorageService } from "./file-storage.service";
import { LocalStore } from "./local.store";

@Module({
	imports: [ServerConfigModule],
	providers: [
		ServerFileStorageService,
		{
			provide: FILE_LOCAL_CONFIG_TOKEN,
			inject: [ServerConfigService],
			useFactory: (config: ServerConfigService): LocalStoreConfig => {
				return {
					path: config.get("FILE_PATH"),
				};
			},
		},
		{
			provide: FILE_STORE_TOKEN,
			useClass: LocalStore,
		},
	],
	exports: [ServerFileStorageService],
})
export class ServerFileStorageModule {}
