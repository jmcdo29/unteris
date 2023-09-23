import {
	Deity,
	DeityCategory,
	DeityDomain,
	Domain,
	Image,
	LocalLogin,
	Location,
	LoginMethod,
	Race,
	RacialAbility,
	Role,
	UserAccount,
	UserPermission,
	VerificationToken,
} from '@unteris/shared/types';
import { Generated } from 'kysely';

type GeneratedId<T> = Omit<T, 'id'> & { id: Generated<string> };

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
	verificationToken: Omit<GeneratedId<VerificationToken>, 'expiresAt'> & {
		expiresAt: Generated<Date>;
	};
	image: GeneratedId<Image>;
}
