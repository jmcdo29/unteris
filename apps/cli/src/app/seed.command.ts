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
	cities,
	deities,
	deityDomains,
	domains,
	images,
	planes,
	races,
	regions,
} from "./seeds/unteris.constants";

@Command({ name: "seed" })
export class SeedCommand extends CommandRunner {
	constructor(
		@OgmaLogger(SeedCommand) private readonly logger: OgmaService,
		@InjectKysely() private readonly db: Kysely<Database>,
		private readonly cliService: CliUtilityService,
	) {
		super();
	}

	async run(
		_params: string[],
		options: { dryRun: boolean; allowErrors: boolean },
	): Promise<void> {
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
				.values(planes.map((loc) => ({ name: loc, type: "plane" }))),
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
		queries.push(
			this.db
				.insertInto("location")
				.columns(["name", "type"])
				.values(regions.map((region) => ({ name: region, type: "region" }))),
		);
		queries.push(
			this.db
				.insertInto("location")
				.columns(["name", "type", "parentId"])
				.values((eb) =>
					Object.keys(cities).flatMap((region) =>
						cities[region as keyof typeof cities].map((city) => ({
							name: city,
							type: "city",
							parentId: eb
								.selectFrom("location")
								.select(["id"])
								.where("name", "=", region),
						})),
					),
				),
		);
		if (options.dryRun) {
			this.logger.log(queries.map((q) => q.compile().sql));
		} else {
			for (const query of queries) {
				try {
					await query.execute();
				} catch (err) {
					if (
						typeof err !== "object" ||
						err === null ||
						!("constraint" in err) ||
						typeof err.constraint !== "string"
					) {
						throw err;
					}
					if (options.allowErrors) {
						this.logger.debug("skipping query");
					} else {
						throw err;
					}
				}
			}
		}
	}

	@Option({ flags: "-d, --dry-run [dryRun]" })
	parseDryRun(val: string) {
		return this.cliService.parseBoolean(val);
	}

	@Option({ flags: "-a, --allow-errors [allowErrors]" })
	parseAllowErrors(val: string) {
		return this.cliService.parseBoolean(val);
	}
}
