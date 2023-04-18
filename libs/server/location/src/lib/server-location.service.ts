import { Injectable } from '@nestjs/common';
import { Database, InjectKysely, LocationTable } from '@unteris/server/kysely';
import { Insertable, Kysely, Selectable } from 'kysely';

@Injectable()
export class ServerLocationService {
  constructor(@InjectKysely() private readonly db: Kysely<Database>) {}

  async getLocations() {
    return this.db.selectFrom('location').select(['id', 'name']).execute();
  }

  async createLocation(
    location: Insertable<LocationTable>
  ): Promise<Selectable<LocationTable>> {
    const result = await this.db
      .insertInto('location')
      .values(location)
      .returningAll()
      .executeTakeFirstOrThrow();
    return result;
  }
}
