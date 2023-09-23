import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { PROCESS_IMAGE_EVENT } from '@unteris/shared/types';

@Injectable()
export class ServerImageClientService {
	constructor(
		@Inject('IMAGE_SERVER_CLIENT') private readonly imageProxy: ClientRMQ
	) {}

	sendImageIdForProcessing(id: string): void {
		this.imageProxy.emit(PROCESS_IMAGE_EVENT, { id });
	}
}
