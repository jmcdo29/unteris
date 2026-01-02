import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { OgmaLogger, OgmaService } from "@ogma/nestjs-module";
import { Command, CommandRunner, Option } from "nest-commander";
import { ulid } from "ulid";

interface MigrationCommandOptions {
	name: string;
}

@Command({
	name: "migration",
	description: "Create a migration file with a given name",
	options: { isDefault: false },
})
export class MigrationCommand extends CommandRunner {
	constructor(
		@OgmaLogger(MigrationCommand) private readonly logger: OgmaService,
	) {
		super();
	}

	async run(
		_passedParams: string[],
		options: MigrationCommandOptions,
	): Promise<void> {
		const fileName = `${ulid()}-${options.name}.ts`;
		const localDir = join("libs", "db", "migrations", "src");
		await writeFile(
			join(process.cwd(), localDir, fileName),
			`import { sql } from "kysely";
import type { DB } from "./utils/db.interface";

export const up = async (db: DB) => {

}

export const down = async (db: DB) => {

}
`,
		);
		this.logger.log(
			`Migration file ${this.logger.style.cyan.apply(join(localDir, fileName))} created.`,
		);
	}

	@Option({
		flags: "-n, --name <name>",
		required: true,
		description: "The name of the migration file",
	})
	parseName(val: string) {
		return val;
	}
}
