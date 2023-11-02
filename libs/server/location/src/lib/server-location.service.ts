import { Injectable, NotFoundException } from "@nestjs/common";
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
	constructor(private readonly locationRepo: LocationRepository) {}

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
		file?: Record<string, unknown>,
	): Promise<Location> {
		const result = this.locationRepo.createLocation(location);
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
