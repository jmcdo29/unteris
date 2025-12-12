import { Injectable } from "@nestjs/common";
import { type Database, InjectKysely } from "@unteris/server/kysely";
import type {
	Location,
	LocationWithImage,
	OverviewObject,
} from "@unteris/shared/types";
import type { Insertable, Kysely, Updateable } from "kysely";

@Injectable()
export class LocationRepository {
	constructor(@InjectKysely() private readonly db: Kysely<Database>) {}

	async getByType(type: Location["type"]): Promise<OverviewObject[]> {
		return this.db
			.selectFrom("location")
			.select(["id", "name"])
			.where("type", "=", type)
			.execute();
	}

	async getByParentId(id: string): Promise<OverviewObject[]> {
		return this.db
			.selectFrom("location")
			.select(["id", "name"])
			.where("parentId", "=", id)
			.execute();
	}

	async createLocation(
		location: Insertable<Database["location"]>,
		file?: string,
	): Promise<Location> {
		let fileId: string | undefined;
		if (file) {
			const result = await this.db
				.insertInto("image")
				.values({
					originalUrl: file,
					type: "location_image",
				})
				.returning(["id"])
				.execute();
			fileId = result[0].id;
		}
		return this.db
			.insertInto("location")
			.values({ ...location, imageId: fileId })
			.returningAll()
			.executeTakeFirstOrThrow();
	}

	async getById(id: string): Promise<LocationWithImage> {
		return this.db
			.selectFrom("location as l")
			.leftJoin("image as i", "i.id", "l.imageId")
			.select([
				"l.id",
				"l.name",
				"l.description",
				"l.parentId",
				"l.type",
				"i.mediumUrl as imageUrl",
			])
			.where("l.id", "=", id)
			.executeTakeFirstOrThrow();
	}

	async update(
		id: string,
		location: Updateable<Database["location"]>,
		file?: string,
	) {
		let fileId: string | undefined;
		if (file) {
			const result = await this.db
				.insertInto("image")
				.values({
					originalUrl: file,
					type: "location_image",
				})
				.returning(["id"])
				.execute();
			fileId = result[0].id;
		}
		if (fileId) {
			location.imageId = fileId;
		}
		return this.db
			.updateTable("location")
			.set(location)
			.where("id", "=", id)
			.returningAll()
			.execute();
	}
}
