import { OgmaLogger, OgmaService } from "@ogma/nestjs-module";
import { Database, InjectKysely } from "@unteris/server/kysely";
import { Kysely } from "kysely";
import {
	CliUtilityService,
	Command,
	CommandRunner,
	Option,
} from "nest-commander";
import {
	categories,
	deities,
	deityDomains,
	domains,
	images,
	locations,
	races,
} from "./seeds/unteris.constants";

@Command({ name: "seed" })
export class FullSeedCommand extends CommandRunner {
	constructor(
		@OgmaLogger(FullSeedCommand) private readonly logger: OgmaService,
		@InjectKysely() private readonly db: Kysely<Database>,
		private readonly cliService: CliUtilityService,
	) {
		super();
	}

	async run(_params: string[], options: { dryRun: boolean }): Promise<void> {
		const dryRun = options.dryRun;
		const queries = [];
		queries.push(
			this.db
				.insertInto("deityCategory")
				.columns(["name"])
				.values(categories.map((cat) => ({ name: cat }))),
		);
		queries.push(
			this.db
				.insertInto("location")
				.columns(["name"])
				.values(locations.map((loc) => ({ name: loc }))),
		);
		const domainNames = Object.keys(domains) as Array<keyof typeof domains>;
		queries.push(
			this.db
				.insertInto("domain")
				.columns(["type", "name"])
				.values(
					domainNames.flatMap((domain) =>
						domains[domain].map((name) => ({ type: domain, name })),
					),
				),
		);
		queries.push(
			this.db
				.insertInto("deity")
				.columns(["name", "description", "categoryId", "locationId"])
				.values((eb) =>
					deities.map((deity) => ({
						name: deity.name,
						description: deity.description.replaceAll("'", "''"),
						categoryId: eb
							.selectFrom("deityCategory")
							.select(["id"])
							.where("name", "=", deity.category),
						locationId: eb
							.selectFrom("location")
							.select(["id"])
							.where("name", "=", deity.location),
						imageId: "",
					})),
				),
		);
		queries.push(
			this.db
				.insertInto("race")
				.columns([
					"name",
					"description",
					"ageDescription",
					"sizeDescription",
					"speed",
					"type",
					"knownLanguages",
				])
				.values(
					races.map((race) => ({
						name: race.name,
						description: race.description,
						ageDescription: race.ageDescription,
						sizeDescription: race.sizeDescription.replaceAll("'", "''"),
						speed: race.speed,
						type: race.type,
						knownLanguages: race.knownLanguages,
					})),
				),
		);
		queries.push(
			this.db
				.insertInto("racialAbility")
				.columns(["description", "name", "raceId"])
				.values((eb) =>
					races.flatMap((race) =>
						race.racialAbilities.map((abil) => ({
							name: abil.name,
							description: abil.description,
							raceId: eb
								.selectFrom("race")
								.select(["id"])
								.where("name", "=", race.name),
						})),
					),
				),
		);
		queries.push(
			this.db
				.insertInto("image")
				.columns(["type", "originalUrl"])
				.values(
					images.map((img) => ({
						type: "deity_avatar",
						originalUrl: `./images/${img}`,
					})),
				),
		);
		queries.push(
			this.db
				.insertInto("deityDomain")
				.columns(["deityId", "domainId"])
				.values((eb) =>
					Object.keys(deityDomains).flatMap((deity) =>
						Object.keys(deityDomains[deity]).flatMap((type) =>
							deityDomains[deity][type].map((domain) => ({
								deityId: eb
									.selectFrom("deity")
									.select(["id"])
									.where("name", "=", deity),
								domainId: eb
									.selectFrom("domain")
									.select(["id"])
									.where("name", "=", domain),
							})),
						),
					),
				),
		);
		if (dryRun) {
			this.logger.log(queries.map((q) => q.compile().sql).join("\n\n"));
		} else {
			for (const query of queries) {
				await query.execute();
			}
		}
	}

	@Option({ flags: "-d, --dry-run [dryRun]" })
	parseDryRun(val: string) {
		return this.cliService.parseBoolean(val);
	}
}
