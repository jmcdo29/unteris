import { Generated } from 'kysely';

export interface DeityTable {
  id: Generated<string>;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface DeityDomainTable {
  id: Generated<string>;
  deityId: string;
  domainId: string;
}

export interface DomainTable {
  id: Generated<string>;
  name: string;
}

export interface DeityCategoryTable {
  id: Generated<string>;
  name: string;
}

export interface Database {
  deity: DeityTable;
  deityDomain: DeityDomainTable;
  deityCategory: DeityCategoryTable;
  domain: DomainTable;
}
