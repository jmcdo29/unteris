import { Injectable } from "@nestjs/common";
import { Database, InjectKysely } from "@unteris/server/kysely";
import { Location } from "@unteris/shared/types";
import { Insertable, Kysely } from "kysely";

@Injectable()
export class LocationRepository {
	constructor(@InjectKysely() private readonly db: Kysely<Database>) {}

	async getLocationsByType(
		type: Location["type"],
	): Promise<Pick<Location, "id" | "name">[]> {
		return this.db
			.selectFrom("location")
			.select(["id", "name"])
			.where("type", "=", type)
			.execute();
	}

	async createLocation(location: Insertable<Location>): Promise<Location> {
		return this.db
			.insertInto("location")
			.values(location)
			.returningAll()
			.executeTakeFirstOrThrow();
	}
}
