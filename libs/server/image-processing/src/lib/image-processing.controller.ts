import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ServerImageProcessingService } from './image-processing.service';
import { PROCESS_IMAGE_EVENT } from '@unteris/shared/types';

@Controller()
export class ServerImageProcessingController {
  constructor(
    private readonly processingService: ServerImageProcessingService
  ) {}

  @EventPattern(PROCESS_IMAGE_EVENT)
  async processImage(@Payload() imageId: string) {
    await this.processingService.processImage(imageId);
  }
}
