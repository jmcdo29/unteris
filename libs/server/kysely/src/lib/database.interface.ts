import type { Generated } from "kysely";
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
} from "./tables";

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
