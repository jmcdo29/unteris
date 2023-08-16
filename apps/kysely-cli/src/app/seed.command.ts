import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { Database, InjectKysely } from '@unteris/server/kysely';
import { ServerLocationService } from '@unteris/server/location';
import { Deity, DeityCategory, Domain, Location } from '@unteris/shared/types';
import { Kysely, Insertable } from 'kysely';
import { Command, CommandRunner, InquirerService } from 'nest-commander';

@Command({ name: 'seed', arguments: '[type]' })
export class SeedCommand extends CommandRunner {
  constructor(
    private readonly inquirer: InquirerService,
    @InjectKysely() private readonly db: Kysely<Database>,
    @OgmaLogger(SeedCommand) private readonly logger: OgmaService,
    private readonly locationService: ServerLocationService
  ) {
    super();
  }

  async run([type]: [type?: string, ...rest: string[]]): Promise<void> {
    try {
      if (!type) {
        ({ type } = await this.inquirer.ask<{ type: keyof Database }>(
          'seed-type',
          {}
        ));
      }
      if (!this.typeIsKeyOfDatabase(type)) {
        throw new Error(`Table "${type}" is not a known database entity`);
      }
      const entityType: keyof Database = type;
      switch (entityType) {
        case 'deityCategory':
          await this.insertDeityCategory();
          break;
        case 'deity':
          await this.insertDeity();
          break;
        case 'domain':
          await this.insertDomain();
          break;
        case 'deityDomain':
          await this.insertDeityDomain();
          break;
        case 'location':
          await this.insertLocation();
          break;
        default:
          this.logger.log('This entity type is still being worked on');
      }
    } catch (err) {
      this.logger.error(err);
    } finally {
      const { doItAgain } = await this.inquirer.ask<{ doItAgain: boolean }>(
        'repeat',
        {}
      );
      if (doItAgain) {
        await this.run([]);
      }
    }
    return;
  }

  private typeIsKeyOfDatabase(type: string): type is keyof Database {
    return [
      'deity',
      'deityCategory',
      'domain',
      'deityDomain',
      'location',
    ].includes(type);
  }

  private async insertDeityCategory(): Promise<void> {
    const data = await this.inquirer.ask<Insertable<DeityCategory>>(
      'deityCategory',
      {}
    );
    await this.db.insertInto('deityCategory').values([data]).execute();
  }

  private async insertDeity(): Promise<void> {
    const { askLocation: _askLocation, ...data } = await this.inquirer.ask<
      Insertable<Deity> & { askLocation: boolean } & { category: string }
    >('deity', {});
    if (this.idFieldIsULID(data.category)) {
      await this.db.insertInto('deity').values([data]).execute();
      return;
    }
    const category = await this.db
      .selectFrom('deityCategory')
      .select('id')
      .where('name', '=', data.category)
      .executeTakeFirst();
    if (!category) {
      throw new Error(
        `Deity category "${data.category}" does not exist in the database.`
      );
    }
    await this.db
      .insertInto('deity')
      .values([{ ...data, categoryId: category.id }])
      .executeTakeFirstOrThrow();
  }

  private async insertLocation(): Promise<void> {
    const { addDescription: _addDescription, ...data } =
      await this.inquirer.ask<
        Insertable<Location> & { addDescription: boolean }
      >('location', {});
    await this.locationService.createLocation(data);
  }

  private async insertDomain(): Promise<void> {
    const data = await this.inquirer.ask<Insertable<Domain>>('domain', {});
    await this.db.insertInto('domain').values([data]).execute();
  }

  private async insertDeityDomain(): Promise<void> {
    const data = await this.inquirer.ask<{
      deityName: string;
      domainName: string;
    }>('deityDomain', {});
    const { id: deityId } = await this.db
      .selectFrom('deity')
      .select('id')
      .where('name', '=', data.deityName)
      .executeTakeFirstOrThrow();
    const { id: domainId } = await this.db
      .selectFrom('domain')
      .select('id')
      .where('name', '=', data.domainName)
      .executeTakeFirstOrThrow();
    await this.db
      .insertInto('deityDomain')
      .values([{ deityId, domainId }])
      .execute();
    const { doItAgain } = await this.inquirer.ask<{ doItAgain: boolean }>(
      'repeat',
      {}
    );
    if (doItAgain) {
      await this.insertDeityDomain();
    }
  }

  private idFieldIsULID(value: string): boolean {
    return /[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}/.test(value);
  }
}
