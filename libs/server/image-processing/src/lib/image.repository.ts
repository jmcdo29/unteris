import { Injectable } from '@nestjs/common';
import { Database, InjectKysely } from '@unteris/server/kysely';
import { Image } from '@unteris/shared/types';
import { Kysely } from 'kysely';

@Injectable()
export class ImageRepo {
	constructor(@InjectKysely() private readonly db: Kysely<Database>) {}

	async getImageById(id: string): Promise<Image | undefined> {
		return this.db
			.selectFrom('image')
			.selectAll()
			.where('id', '=', id)
			.executeTakeFirst();
	}

	async updateImageUrls(
		imageId: string,
		paths: { small: string; medium: string; large: string }
	): Promise<void> {
		await this.db
			.updateTable('image')
			.set({
				smallUrl: paths.small,
				mediumUrl: paths.medium,
				largeUrl: paths.large,
			})
			.where('id', '=', imageId)
			.execute();
	}
}
