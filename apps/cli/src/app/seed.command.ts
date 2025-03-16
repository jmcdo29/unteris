import { OgmaLogger, type OgmaService } from "@ogma/nestjs-module";
import { type Database, InjectKysely } from "@unteris/server/kysely";
import type { CompiledQuery, InsertResult, Kysely } from "kysely";
import {
	type CliUtilityService,
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

	private deityCategoryInsert(): CompiledQuery {
		return this.db
			.insertInto("deityCategory")
			.columns(["name"])
			.values(categories.map((cat) => ({ name: cat })))
			.compile();
	}

	private planeInsert(): CompiledQuery {
		return this.db
			.insertInto("location")
			.columns(["name"])
			.values(planes.map((loc) => ({ name: loc, type: "plane" })))
			.compile();
	}

	private domainInsert(): CompiledQuery {
		const domainNames = Object.keys(domains) as Array<keyof typeof domains>;
		return this.db
			.insertInto("domain")
			.columns(["type", "name"])
			.values(
				domainNames.flatMap((domain) =>
					domains[domain].map((name) => ({ type: domain, name })),
				),
			)
			.compile();
	}

	private deityInsert(): CompiledQuery {
		return this.db
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
			)
			.compile();
	}

	private raceInsert(): CompiledQuery {
		return this.db
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
			)
			.compile();
	}

	private racialAbilityInsert(): CompiledQuery {
		return this.db
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
			)
			.compile();
	}

	private imageInsert(): CompiledQuery {
		return this.db
			.insertInto("image")
			.columns(["type", "originalUrl"])
			.values(
				images.map((img) => ({
					type: "deity_avatar",
					originalUrl: `./images/${img}`,
				})),
			)
			.compile();
	}

	private deityDomainInsert(): CompiledQuery {
		return this.db
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
			)
			.compile();
	}

	private regionInsert(): CompiledQuery {
		return this.db
			.insertInto("location")
			.columns(["name", "type"])
			.values(
				regions.map((region) => ({
					name: region.name,
					description: region.description,
					type: "region",
				})),
			)
			.compile();
	}
	private cityInsert(): CompiledQuery {
		return this.db
			.insertInto("location")
			.columns(["name", "type", "parentId"])
			.values((eb) =>
				Object.keys(cities).flatMap((region) =>
					cities[region as keyof typeof cities].map((city) => ({
						name: city.name,
						description: city.description,
						type: "city",
						parentId: eb
							.selectFrom("location")
							.select(["id"])
							.where("name", "=", region),
					})),
				),
			)
			.compile();
	}

	private handleErrors(
		err: unknown,
		options: { allowErrors: boolean },
		query: CompiledQuery,
	): void {
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
			this.logger.fine(query.sql);
		} else {
			throw err;
		}
	}

	async run(
		_params: string[],
		options: { dryRun: boolean; allowErrors: boolean },
	): Promise<void> {
		const queries: Array<CompiledQuery<InsertResult>> = [];
		queries.push(
			this.deityCategoryInsert(),
			this.planeInsert(),
			this.domainInsert(),
			this.deityInsert(),
			this.raceInsert(),
			this.racialAbilityInsert(),
			this.imageInsert(),
			this.deityDomainInsert(),
			this.regionInsert(),
			this.cityInsert(),
		);
		if (options.dryRun) {
			this.logger.log(queries.map((q) => q.sql));
		} else {
			for (const query of queries) {
				try {
					await this.db.executeQuery(query);
				} catch (err) {
					this.handleErrors(err, options, query);
				}
			}
		}
	}

	@Option({ flags: "-d, --dry-run [dryRun]" })
	parseDryRun(val: string): boolean {
		return this.cliService.parseBoolean(val);
	}

	@Option({ flags: "-a, --allow-errors [allowErrors]" })
	parseAllowErrors(val: string): boolean {
		return this.cliService.parseBoolean(val);
	}
}
