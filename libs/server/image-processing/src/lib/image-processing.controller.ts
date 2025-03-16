import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
<<<<<<< HEAD
import { IdParam, PROCESS_IMAGE_EVENT } from "@unteris/server/common";
import { ServerImageProcessingService } from "./image-processing.service";
=======
import { type IdParam, PROCESS_IMAGE_EVENT } from "@unteris/shared/types";
import type { ServerImageProcessingService } from "./image-processing.service";
>>>>>>> 6631869 (chore: update code for biome rules)

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
