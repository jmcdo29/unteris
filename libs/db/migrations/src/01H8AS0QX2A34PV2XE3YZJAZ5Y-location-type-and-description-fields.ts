import { Kysely } from 'kysely';
import { kyselyUlid } from './ulid.sql';

export const up = async (db: Kysely<any>) => {
  await db.schema
    .alterTable('location')
    .addColumn('type', 'text')
    .addColumn('parent_id', kyselyUlid, (col) => col.references('location.id'))
    .execute();
  await db.updateTable('location').set({ type: 'plane' }).execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema
    .alterTable('location')
    .dropColumn('parent_id')
    .dropColumn('type')
    .execute();
};
