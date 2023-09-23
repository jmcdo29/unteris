import { Kysely, sql } from 'kysely';

export const up = async (
	db: Kysely<Record<string, Record<string, unknown>>>,
) => {
	await db.schema
		.createTable('location')
		.addColumn('id', 'text', (col) => col.defaultTo(sql`ulid()`).primaryKey())
		.addColumn('name', 'text', (col) => col.notNull())
		.addColumn('description', 'text')
		.execute();
	const [{ id }] = await db
		.insertInto('location')
		.values({
			name: '',
			description: 'Used for holding default deity locations',
		})
		.returning('id')
		.execute();
	await db.schema
		.alterTable('deity')
		.addColumn('location', 'text', (col) =>
			col.references('location.id').notNull().defaultTo(id),
		)
		.execute();
};

export const down = async (
	db: Kysely<Record<string, Record<string, unknown>>>,
) => {
	await db.schema.alterTable('deity').dropColumn('location').execute();
	await db.schema.dropTable('location').execute();
};
