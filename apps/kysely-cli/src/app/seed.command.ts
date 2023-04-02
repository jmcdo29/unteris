import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import {
  Database,
  DeityCategoryTable,
  DeityTable,
  DomainTable,
  InjectKysely,
} from '@unteris/server/kysely';
import { Kysely, Insertable } from 'kysely';
import { Command, CommandRunner, InquirerService } from 'nest-commander';

@Command({ name: 'seed', arguments: '[type]' })
export class SeedCommand extends CommandRunner {
  constructor(
    private readonly inquirer: InquirerService,
    @InjectKysely() private readonly db: Kysely<Database>,
    @OgmaLogger(SeedCommand) private readonly logger: OgmaService
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
      const data = await this.inquirer.ask<
        Insertable<Database[typeof entityType]>
      >(entityType, {});
      switch (entityType) {
        case 'deityCategory':
          await this.insertDeityCategory(
            data as Insertable<DeityCategoryTable>
          );
          break;
        case 'deity':
          await this.insertDeity(data as Insertable<DeityTable>);
          break;
        case 'domain':
          await this.insertDomain(data as Insertable<DomainTable>);
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
        await this.run([], {});
      }
    }
    return;
  }

  private typeIsKeyOfDatabase(type: string): type is keyof Database {
    return ['deity', 'deityCategory', 'domain', 'deityDomain'].includes(type);
  }

  private async insertDeityCategory(
    data: Insertable<DeityCategoryTable>
  ): Promise<void> {
    await this.db.insertInto('deityCategory').values([data]).execute();
  }

  private async insertDeity(data: Insertable<DeityTable>): Promise<void> {
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
      .values([{ ...data, category: category.id }])
      .execute();
  }

  private async insertDomain(data: Insertable<DomainTable>): Promise<void> {
    await this.db.insertInto('domain').values([data]).execute();
  }

  private idFieldIsULID(value: string): boolean {
    return /[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}/.test(value);
  }
}
