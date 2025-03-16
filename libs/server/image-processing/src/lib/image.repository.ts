import { Injectable } from "@nestjs/common";
<<<<<<< HEAD
import {
	type Database,
	InjectKysely,
	SavedImage,
} from "@unteris/server/kysely";
=======
import { type Database, InjectKysely } from "@unteris/server/kysely";
import type { Image } from "@unteris/shared/types";
>>>>>>> 6631869 (chore: update code for biome rules)
import type { Kysely } from "kysely";

@Injectable()
export class ImageRepo {
	constructor(@InjectKysely() private readonly db: Kysely<Database>) {}

	async getImageById(id: string): Promise<SavedImage | undefined> {
		return this.db
			.selectFrom("image")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();
	}

	async updateImageUrls(
		imageId: string,
		paths: { small: string; medium: string; large: string },
	): Promise<void> {
		await this.db
			.updateTable("image")
			.set({
				smallUrl: paths.small,
				mediumUrl: paths.medium,
				largeUrl: paths.large,
			})
			.where("id", "=", imageId)
			.execute();
	}
}
