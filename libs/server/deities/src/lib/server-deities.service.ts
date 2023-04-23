import { Injectable } from '@nestjs/common';
import {
  Database,
  DeityCategoryTable,
  DeityTable,
  InjectKysely,
} from '@unteris/server/kysely';
import { Kysely, Selectable } from 'kysely';

@Injectable()
export class ServerDeitiesService {
  constructor(@InjectKysely() private readonly db: Kysely<Database>) {}

  async getAllCategories(): Promise<Selectable<DeityCategoryTable>[]> {
    return this.db.selectFrom('deityCategory').select(['id', 'name']).execute();
  }

  async findDeitiesOfCategory(
    category: string
  ): Promise<Selectable<Pick<DeityTable, 'id' | 'name'>>[]> {
    return this.db
      .selectFrom('deity')
      .select(['id', 'name'])
      .where('category', '=', category)
      .execute();
  }

  async getDeityById(id: string): Promise<Selectable<DeityTable>> {
    return this.db
      .selectFrom('deity')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
  }

  async findDeitiesOfLocation(
    location: string
  ): Promise<Selectable<Pick<DeityTable, 'id' | 'name'>>[]> {
    return this.db
      .selectFrom('deity')
      .select(['id', 'name'])
      .where('location', '=', location)
      .execute();
  }
}
