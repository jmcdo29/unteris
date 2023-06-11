import {
  Location,
  Deity,
  DeityCategory,
  Domain,
  DeityDomain,
  Race,
  RacialAbility,
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
}
