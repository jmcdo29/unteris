import { Kysely } from 'kysely';

export const up = async (db: Kysely<any>) => {
  await db.schema.alterTable('domain').addColumn('type', 'text').execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.alterTable('domain').dropColumn('type').execute();
};
