import { Injectable, NotFoundException } from "@nestjs/common";
import type { File, OverviewObject } from "@unteris/server/common";
import { ServerFileStorageService } from "@unteris/server/file-storage";
import { ServerImageClientService } from "@unteris/server/image-client";
import { LocationRepository } from "./location.repository";
import {
	GetLocationByIdResponse,
	LocationByTypeQuery,
	LocationCreateResponse,
	LocationCreation,
	LocationUpdate,
	LocationUpdateResponse,
} from "./models";

@Injectable()
export class ServerLocationService {
	constructor(
		private readonly locationRepo: LocationRepository,
		private readonly imageService: ServerImageClientService,
		private readonly fileService: ServerFileStorageService,
	) {}

	async getByType({ type }: LocationByTypeQuery): Promise<OverviewObject[]> {
		return this.locationRepo.getByType(type);
	}

	async getByParentId(id: string): Promise<OverviewObject[]> {
		return this.locationRepo.getByParentId(id);
	}

	async getById(id: string): Promise<GetLocationByIdResponse> {
		return this.locationRepo.getById(id);
	}

	async createLocation(
		location: LocationCreation,
		file?: File,
	): Promise<LocationCreateResponse> {
		const filePath = await this.saveFile(file);
		const result = await this.locationRepo.createLocation(location, filePath);
		if (result.imageId) {
			this.imageService.sendImageIdForProcessing(result.imageId);
		}
		return result;
	}

	async updateLocation(
		id: string,
		location: LocationUpdate,
		file?: File,
	): Promise<LocationUpdateResponse> {
		if (!(await this.getById(id))) {
			throw new NotFoundException(`Location with the id ${id} not found`);
		}
		const filePath = await this.saveFile(file);
		const result = await this.locationRepo.update(id, location, filePath);
		if (filePath && result[0].imageId) {
			this.imageService.sendImageIdForProcessing(result[0].imageId);
		}
		return { success: true };
	}

	private async saveFile(file?: File): Promise<string | undefined> {
		let filePath: string | undefined;
		if (file) {
			filePath = `./images/${file.originalname}`;
			await this.fileService.writeFileToStore(filePath, file.buffer);
		}
		return filePath;
	}
}
