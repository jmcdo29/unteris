import {
	AbilityBuilder,
	createMongoAbility,
	type MongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import type { AuthorizedUser } from "@unteris/server/common";
import { Action } from "./action.enum";
import { Subject } from "./subject.enum";

@Injectable()
export class ServerCastleService {
	buildAbilityForUser(user: AuthorizedUser): MongoAbility {
		const builder = new AbilityBuilder(createMongoAbility);
		this.buildLocationAbilityForUser(user, builder)
			.buildDeityAbilityForUser(user, builder)
			.buildRaceAbilityForUser(user, builder)
			.buildAccountAbilityForUser(user, builder);
		return builder.build();
	}

	private buildLoreAbilityForUser(
		user: AuthorizedUser,
		builder: AbilityBuilder<MongoAbility>,
		lore: Subject,
	): this {
		builder.can(Action.Read, lore);
		if (user.roles.some((r) => ["dev", "admin", "dm"].includes(r))) {
			builder.can(Action.Manage, lore);
		}
		return this;
	}

	private buildLocationAbilityForUser(
		user: AuthorizedUser,
		builder: AbilityBuilder<MongoAbility>,
	): this {
		return this.buildLoreAbilityForUser(user, builder, Subject.Location);
	}

	private buildDeityAbilityForUser(
		user: AuthorizedUser,
		builder: AbilityBuilder<MongoAbility>,
	): this {
		return this.buildLoreAbilityForUser(user, builder, Subject.Deity);
	}

	private buildRaceAbilityForUser(
		user: AuthorizedUser,
		builder: AbilityBuilder<MongoAbility>,
	): this {
		return this.buildLoreAbilityForUser(user, builder, Subject.Race);
	}

	private buildAccountAbilityForUser(
		user: AuthorizedUser,
		builder: AbilityBuilder<MongoAbility>,
	): this {
		builder.can(Action.Read, Subject.Account, { id: user.id });
		builder.can(Action.Update, Subject.Account, { id: user.id });
		builder.can(Action.Delete, Subject.Account, { id: user.id });
		return this;
	}
}
