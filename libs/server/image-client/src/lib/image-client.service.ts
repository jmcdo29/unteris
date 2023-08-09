import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class ServerImageClientService {
  constructor(
    @Inject('IMAGE_SERVER_CLIENT') private readonly imageProxy: ClientRMQ
  ) {}

  sendImageIdForProcessing(id: string): void {
    this.imageProxy.emit('PATTERN_GOES_HERE', { id });
  }
}
