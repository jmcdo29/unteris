import { Module } from "@nestjs/common";
import { ServerFileStorageModule } from "@unteris/server/file-storage";
import { KyselyModule } from "@unteris/server/kysely";
import { ServerImageProcessingController } from "./image-processing.controller";
import { ServerImageProcessingService } from "./image-processing.service";
import { ImageRepo } from "./image.repository";

@Module({
	imports: [ServerFileStorageModule, KyselyModule],
	controllers: [ServerImageProcessingController],
	providers: [ServerImageProcessingService, ImageRepo],
	exports: [ServerImageProcessingService],
})
export class ServerImageProcessingModule {}
