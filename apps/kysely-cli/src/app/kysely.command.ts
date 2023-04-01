import { InjectKysely } from '@unteris/server/kysely';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { promises as fs } from 'fs';
import {
  Kysely,
  Migrator,
  FileMigrationProvider,
  MigrationResultSet,
} from 'kysely';
import { Command, CommandRunner, Option } from 'nest-commander';
import * as path from 'path';

interface KyselyCliOptions {
  name?: string;
  down?: boolean;
}

@Command({ name: 'migrate', options: { isDefault: true } })
export class KyselyCliCommand extends CommandRunner {
  constructor(
    @InjectKysely() private readonly kysely: Kysely<any>,
    @OgmaLogger(KyselyCliCommand) private readonly logger: OgmaService
  ) {
    super();
  }
  async run(_inputs: string[], options: KyselyCliOptions) {
    this.logger.log('Starting Migrations');
    try {
      const migrator = new Migrator({
        db: this.kysely,
        provider: new FileMigrationProvider({
          fs,
          path,
          migrationFolder: path.join(
            process.cwd(),
            'dist',
            'libs',
            'db',
            'migrations',
            'src'
          ),
        }),
      });
      let callMigration: Promise<MigrationResultSet>;
      if (options.name) {
        callMigration = migrator.migrateTo(options.name);
      } else if (options.down) {
        callMigration = migrator.migrateDown();
      } else {
        callMigration = migrator.migrateToLatest();
      }
      let migrationErrors: unknown[] = [];
      const { results, error } = await callMigration;
      migrationErrors.push(error);
      results?.forEach((result) => {
        if (result.status === 'Success') {
          this.logger.log(
            `Migration ${result.migrationName} successfully migrated ${result.direction}.`
          );
        } else if (result.status === 'Error') {
          migrationErrors.push(
            `Migration ${result.migrationName} encountered an error while migrating ${result.direction}`
          );
        }
      });
      migrationErrors = migrationErrors.filter((error) => !!error);
      if (migrationErrors.length) {
        throw new Error(migrationErrors.join('\n'));
      }
    } catch (err) {
      this.logger.error(err);
    } finally {
      this.logger.log('Migrations Finished');
    }
  }

  @Option({
    flags: '-n, --name <name>',
  })
  parseMigrationName(name: string) {
    return name;
  }

  @Option({
    flags: '-d, --down [down]',
  })
  parseDownOptions(down?: string) {
    return !!down;
  }
}
