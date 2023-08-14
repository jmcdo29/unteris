import { RawBuilder, sql } from 'kysely';

export const kyselyUlid = <T = any>(): RawBuilder<T> => {
  return sql`gen_ulid()`;
};
