import { Kysely, sql } from 'kysely';

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable('location')
    .addColumn('id', 'text', (col) => col.defaultTo(sql`ulid()`).primaryKey())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('description', 'text')
    .execute();
  await db.schema
    .alterTable('deity')
    .addColumn('location_id', 'text', (col) =>
      col.references('location.ud').notNull().defaultTo('')
    )
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.alterTable('deity').dropColumn('location_id').execute();
  await db.schema.dropTable('location').execute();
};
