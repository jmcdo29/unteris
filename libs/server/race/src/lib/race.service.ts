import { Injectable, NotFoundException } from '@nestjs/common';
import { Database, InjectKysely } from '@unteris/server/kysely';
import { Race, RaceWithAbilities } from '@unteris/shared/types';
import { Kysely } from 'kysely';

@Injectable()
export class ServerRaceService {
  constructor(
    @InjectKysely()
    private readonly db: Kysely<Pick<Database, 'race' | 'racialAbility'>>
  ) {}

  async getRaces(): Promise<Array<Pick<Race, 'id' | 'name'>>> {
    return this.db
      .selectFrom('race')
      .select(['id', 'name'])
      .orderBy('name', 'asc')
      .execute();
  }

  async getRaceWithAbilities(id: string): Promise<RaceWithAbilities> {
    const race = await this.db
      .selectFrom('race')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
    if (!race) {
      throw new NotFoundException(`Race with id ${id} not found`);
    }
    const abilities = await this.db
      .selectFrom('racialAbility')
      .select(['name', 'description'])
      .where('raceId', '=', id)
      .execute();
    return { ...race, racialAbilities: abilities };
  }
}
