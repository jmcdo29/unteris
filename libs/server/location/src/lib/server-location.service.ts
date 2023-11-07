import { Injectable, NotFoundException } from "@nestjs/common";
import { File } from "@unteris/server/common";
import { ServerFileStorageService } from "@unteris/server/file-storage";
import { ServerImageClientService } from "@unteris/server/image-client";
import { Database } from "@unteris/server/kysely";
import {
	Location,
	LocationWithImage,
	OverviewObject,
} from "@unteris/shared/types";
import { Insertable, Updateable } from "kysely";
import { LocationRepository } from "./location.repository";

@Injectable()
export class ServerLocationService {
	constructor(
		private readonly locationRepo: LocationRepository,
		private readonly imageService: ServerImageClientService,
		private readonly fileService: ServerFileStorageService,
	) {}

	async getByType(type: Location["type"]): Promise<OverviewObject[]> {
		return this.locationRepo.getByType(type);
	}

	async getByParentId(id: string): Promise<OverviewObject[]> {
		return this.locationRepo.getByParentId(id);
	}

	async getById(id: string): Promise<LocationWithImage> {
		return this.locationRepo.getById(id);
	}

	async createLocation(
		location: Insertable<Database["location"]>,
		file?: File,
	): Promise<Location> {
		let filePath;
		if (file) {
			filePath = file.originalname;
			await this.fileService.writeFileToStore(filePath, file.buffer);
		}
		const result = await this.locationRepo.createLocation(location, filePath);
		if (result.imageId) {
			this.imageService.sendImageIdForProcessing(result.imageId);
		}
		return result;
	}

	async updateLocation(id: string, location: Updateable<Database["location"]>) {
		if (!(await this.getById(id))) {
			throw new NotFoundException(`Location with the id ${id} not found`);
		}
		await this.locationRepo.update(id, location);
		return { success: true };
	}
}
