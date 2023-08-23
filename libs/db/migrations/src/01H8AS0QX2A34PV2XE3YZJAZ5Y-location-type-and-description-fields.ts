import { Kysely, sql } from 'kysely';

export const up = async (db: Kysely<any>) => {
  await db.schema
    .alterTable('location')
    .addColumn('type', 'text')
    .addColumn('parent_id', sql`ulid`, (col) => col.references('location.id'))
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema
    .alterTable('location')
    .dropColumn('parent_id')
    .dropColumn('type')
    .execute();
};
