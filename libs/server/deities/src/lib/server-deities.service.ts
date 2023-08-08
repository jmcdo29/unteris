import { BadRequestException, Injectable } from '@nestjs/common';
import { Database, InjectKysely } from '@unteris/server/kysely';
import { Deity } from '@unteris/shared/types';
import { Kysely } from 'kysely';

type DeityReturn = Omit<Deity, 'imageId'> & { imageUrl: string | null };

@Injectable()
export class ServerDeitiesService {
  constructor(@InjectKysely() private readonly db: Kysely<Database>) {}

  async findDeitiesOfCategory(
    category: string
  ): Promise<Pick<Deity, 'id' | 'name'>[]> {
    return this.db
      .selectFrom('deity')
      .select(['id', 'name'])
      .orderBy('id', 'asc')
      .where('categoryId', '=', category)
      .execute();
  }

  async getDeityById(id: string): Promise<DeityReturn> {
    const deityRecords = await this.db
      .selectFrom('deity')
      .leftJoin('deityDomain', 'deity.id', 'deityDomain.deityId')
      .leftJoin('domain', 'deityDomain.domainId', 'domain.id')
      .leftJoin('image', 'imageId', 'image.id')
      .select([
        'deity.id as id',
        'deity.name as name',
        'description',
        'domain.name as domainName',
        'domain.type as domainType',
        'domain.id as domainId',
        'image.originalUrl as imageUrl',
      ])
      .where('deity.id', '=', id)
      .execute();
    if (deityRecords.length === 0) {
      throw new BadRequestException(`No deity found with Id ${id}`);
    }
    const deity: DeityReturn = {
      name: deityRecords[0].name,
      id,
      description: deityRecords[0].description,
      imageUrl: deityRecords[0].imageUrl,
      domain: [],
    };
    deityRecords.reduce((prev, curr) => {
      if (prev.domain === undefined) {
        prev.domain = [];
      }
      if (!curr.domainId) {
        return prev;
      }
      prev.domain.push({
        type: curr.domainType as 'warlock' | 'druid' | 'cleric',
        name: curr.domainName?.toString() ?? '',
        id: curr.domainId ?? '',
      });
      return prev;
    }, deity);
    return deity;
  }

  async findDeitiesOfLocation(
    location: string
  ): Promise<Pick<Deity, 'id' | 'name'>[]> {
    return this.db
      .selectFrom('deity')
      .select(['id', 'name'])
      .orderBy('id', 'asc')
      .where('locationId', '=', location)
      .execute();
  }
}
