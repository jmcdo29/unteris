import { Inject, Injectable } from "@nestjs/common";
import type { ClientRMQ } from "@nestjs/microservices";
import { PROCESS_IMAGE_EVENT } from "@unteris/server/common";

@Injectable()
export class ServerImageClientService {
	constructor(
		@Inject("IMAGE_SERVER_CLIENT") private readonly imageProxy: ClientRMQ,
	) {}

	sendImageIdForProcessing(id: string): void {
		this.imageProxy.emit(PROCESS_IMAGE_EVENT, { id });
	}
}
