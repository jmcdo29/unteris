import { RawBuilder, sql } from 'kysely';

export const kyselyDefaultUlid = <T = any>(): RawBuilder<T> => {
  return sql`gen_ulid()`;
};

export const kyselyUlid = sql`ulid`;
