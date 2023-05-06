import { Kysely } from 'kysely';

const domainNameType = 'domain_name_type';

export const up = async (db: Kysely<any>) => {
  await db.schema
    .alterTable('domain')
    .addUniqueConstraint(domainNameType, ['name', 'type'])
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.alterTable('domain').dropConstraint(domainNameType).execute();
};
