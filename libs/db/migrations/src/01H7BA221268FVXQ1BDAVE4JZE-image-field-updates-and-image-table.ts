import { Kysely, sql } from 'kysely';

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable('image')
    .addColumn('id', sql`ulid`, (col) => col.defaultTo(sql`generate_ulid()`))
    .addColumn('type', 'text', (col) => col.notNull())
    .addColumn('original_url', 'text')
    .addColumn('small_url', 'text')
    .addColumn('medium_url', 'text')
    .addColumn('large_url', 'text')
    .execute();
  await db
    .insertInto('image')
    .columns(['type', 'original_url'])
    .expression((eb) =>
      eb
        .selectFrom('deity')
        .select([eb.val('deity_avatar').as('type'), 'image_url'])
    )
    .execute();
  await db
    .insertInto('image')
    .columns(['type', 'original_url'])
    .expression((eb) =>
      eb
        .selectFrom('user_account')
        .select([eb.val('user_avatar').as('type'), 'photo_url'])
    )
    .execute();
  await db.schema
    .alterTable('deity')
    .renameColumn('image_url', 'image_id')
    .renameColumn('category', 'category_id')
    .renameColumn('location', 'location_id')
    .execute();
  await db.schema
    .alterTable('user_account')
    .renameColumn('photo_url', 'image_id')
    .execute();
  await db
    .updateTable('deity')
    .set((eb) => ({
      image_id: eb
        .selectFrom('image')
        .select('id')
        .where('original_url', '=', 'deity.image_id')
        .where('type', '=', 'deity_avatar'),
    }))
    .execute();
  await db
    .updateTable('user_account')
    .set((eb) => ({
      image_id: eb
        .selectFrom('image')
        .select('id')
        .where('original_url', '=', 'user_account.image_id')
        .where('type', '=', 'user_avatar'),
    }))
    .execute();
  await db.schema
    .alterTable('deity')
    .addForeignKeyConstraint('deity_image_id_fkey', ['image_id'], 'image', [
      'id',
    ])
    .execute();
  await db.schema
    .alterTable('user_account')
    .addForeignKeyConstraint(
      'user_account_image_id_fkey',
      ['image_id'],
      'image',
      ['id']
    )
    .execute();
};

export const down = async (_db: Kysely<any>) => {
  /* intentioanlly no op */
};