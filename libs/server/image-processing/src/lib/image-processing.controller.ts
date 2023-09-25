import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { IdParam, PROCESS_IMAGE_EVENT } from "@unteris/shared/types";
import { ServerImageProcessingService } from "./image-processing.service";

@Controller()
export class ServerImageProcessingController {
	constructor(
		private readonly processingService: ServerImageProcessingService,
	) {}

	@EventPattern(PROCESS_IMAGE_EVENT)
	async processImage(@Payload() imageId: IdParam) {
		await this.processingService.processImage(imageId.id);
	}
}
