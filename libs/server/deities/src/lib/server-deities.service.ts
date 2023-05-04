import { Injectable } from '@nestjs/common';
import { Database, InjectKysely } from '@unteris/server/kysely';
import { Deity } from '@unteris/shared/types';
import { Kysely, Selectable } from 'kysely';

@Injectable()
export class ServerDeitiesService {
  constructor(@InjectKysely() private readonly db: Kysely<Database>) {}

  async findDeitiesOfCategory(
    category: string
  ): Promise<Selectable<Pick<Deity, 'id' | 'name'>>[]> {
    return this.db
      .selectFrom('deity')
      .select(['id', 'name'])
      .where('category', '=', category)
      .execute();
  }

  async getDeityById(id: string): Promise<Selectable<Deity>> {
    return this.db
      .selectFrom('deity')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
  }

  async findDeitiesOfLocation(
    location: string
  ): Promise<Selectable<Pick<Deity, 'id' | 'name'>>[]> {
    return this.db
      .selectFrom('deity')
      .select(['id', 'name'])
      .where('location', '=', location)
      .execute();
  }
}
