import { Kysely, sql } from 'kysely';

export const up = async (
	db: Kysely<Record<string, Record<string, unknown>>>
) => {
	await db.schema
		.createTable('verification_token')
		.addColumn('id', 'text', (col) => col.defaultTo(sql`ulid()`).primaryKey())
		.addColumn('token', 'text', (col) => col.notNull())
		.addColumn('user_id', 'text', (col) =>
			col.references('user_account.id').onDelete('cascade').notNull()
		)
		.addColumn('expires_at', 'timestamptz', (col) =>
			col.defaultTo(sql`CURRENT_TIMESTAMP + '1 hour'`)
		)
		.addColumn('type', 'text', (col) => col.notNull().defaultTo('verification'))
		.execute();
};

export const down = async (
	db: Kysely<Record<string, Record<string, unknown>>>
) => {
	await db.schema.dropTable('verification_token').execute();
};
