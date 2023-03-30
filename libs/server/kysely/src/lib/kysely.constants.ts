import { Inject } from '@nestjs/common';

const KYSELY_CONFIG = Symbol('KYSELY:CONFIG');
const KYSELY_INSTANCE = Symbol('KYSELY:INSTANCE');
export const getKyselyConfigToken = () => KYSELY_CONFIG;
export const getKyselyInstanceToken = () => KYSELY_INSTANCE;
export const InjectKysely = () => Inject(getKyselyInstanceToken());
