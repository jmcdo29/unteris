import { Injectable } from "@nestjs/common";
<<<<<<< HEAD
import { OverviewObject } from "@unteris/server/common";
import { type Database, InjectKysely } from "@unteris/server/kysely";
=======
import { File } from "@unteris/server/common";
import { type Database, InjectKysely } from "@unteris/server/kysely";
import type {
	Location,
	LocationWithImage,
	OverviewObject,
} from "@unteris/shared/types";
>>>>>>> 6631869 (chore: update code for biome rules)
import type { Insertable, Kysely, Updateable } from "kysely";

@Injectable()
export class LocationRepository {
	constructor(@InjectKysely() private readonly db: Kysely<Database>) {}

	async getByType(
		type: Database["location"]["type"],
	): Promise<OverviewObject[]> {
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
<<<<<<< HEAD
	) {
=======
	): Promise<Location> {
>>>>>>> 6631869 (chore: update code for biome rules)
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

	async getById(id: string) {
		return this.db
			.selectFrom("location as l")
			.leftJoin("image as i", "i.id", "l.imageId")
			.select((eb) => [
				"l.id",
				"l.name",
				"l.description",
				"l.parentId",
				"l.type",
				eb
					.case()
					.when(eb.ref("i.mediumUrl"), "is not", null)
					.then(eb.ref("i.mediumUrl"))
					.else(eb.ref("i.originalUrl"))
					.end()
					.as("imageUrl"),
			])
			.where("l.id", "=", id)
			.executeTakeFirstOrThrow();
	}

	async update(
		id: string,
		location: Updateable<Database["location"]>,
		file?: string,
<<<<<<< HEAD
	) {
=======
	): Promise<Array<Location>> {
>>>>>>> 6631869 (chore: update code for biome rules)
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
