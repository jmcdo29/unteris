<<<<<<< HEAD
import type { Generated } from "kysely";
=======
>>>>>>> 6631869 (chore: update code for biome rules)
import type {
	Deity,
	DeityCategory,
	DeityDomain,
	Domain,
	LocalLogin,
	Location,
	LoginMethod,
	Race,
	RacialAbility,
	Role,
	SavedImage,
	UserAccount,
	UserPermission,
	UserSession,
	VerificationToken,
<<<<<<< HEAD
} from "./tables";
=======
} from "@unteris/shared/types";
import type { Generated } from "kysely";
>>>>>>> 6631869 (chore: update code for biome rules)

type GeneratedId<T> = Omit<T, "id"> & { id: Generated<string> };

export interface Database {
	deity: GeneratedId<Deity>;
	deityDomain: GeneratedId<DeityDomain>;
	deityCategory: GeneratedId<DeityCategory>;
	domain: GeneratedId<Domain>;
	location: GeneratedId<Location>;
	race: GeneratedId<Race>;
	racialAbility: GeneratedId<RacialAbility>;
	userPermission: GeneratedId<UserPermission>;
	userAccount: GeneratedId<UserAccount>;
	localLogin: GeneratedId<LocalLogin>;
	loginMethod: GeneratedId<LoginMethod>;
	role: GeneratedId<Role>;
	verificationToken: Omit<GeneratedId<VerificationToken>, "expiresAt"> & {
		expiresAt: Generated<Date>;
	};
	image: GeneratedId<SavedImage>;
	userSession: UserSession;
}
