import { promises as fs } from "node:fs";
import * as path from "node:path";
import { OgmaLogger, type OgmaService } from "@ogma/nestjs-module";
import { InjectKysely } from "@unteris/server/kysely";
import {
	FileMigrationProvider,
	type Kysely,
	type MigrationResultSet,
	Migrator,
} from "kysely";
import { Command, CommandRunner, Option } from "nest-commander";

interface KyselyCliOptions {
	name?: string;
	down?: boolean;
}

@Command({ name: "migrate", options: { isDefault: true } })
export class KyselyCliCommand extends CommandRunner {
	constructor(
		@InjectKysely() private readonly kysely: Kysely<unknown>,
		@OgmaLogger(KyselyCliCommand) private readonly logger: OgmaService,
	) {
		super();
	}
	async run(_inputs: string[], options: KyselyCliOptions): Promise<void> {
		this.logger.log("Starting Migrations");
		const migrator = new Migrator({
			db: this.kysely,
			provider: new FileMigrationProvider({
				fs,
				path,
				migrationFolder: path.join(
					process.cwd(),
					"dist",
					"libs",
					"db",
					"migrations",
					"src",
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
		for (const result of results ?? []) {
			if (result.status === "Success") {
				this.logger.log(
					`Migration ${result.migrationName} successfully migrated ${result.direction}.`,
				);
			} else if (result.status === "Error") {
				migrationErrors.push(
					`Migration ${result.migrationName} encountered an error while migrating ${result.direction}`,
				);
			}
		}
		migrationErrors = migrationErrors.filter((error) => !!error);
		if (migrationErrors.length) {
			for (const err of migrationErrors) {
				if (err instanceof Error) {
					this.logger.printError(err, { context: "Migration Error" });
				} else {
					this.logger.error(err);
				}
			}
		}
		this.logger.log("Migrations Finished");
	}

	@Option({
		flags: "-n, --name <name>",
	})
	parseMigrationName(name: string): string {
		return name;
	}

	@Option({
		flags: "-d, --down [down]",
	})
	parseDownOptions(down?: string): boolean {
		return !!down;
	}
}
