let domainInsert = 'INSERT INTO domain (name, type) VALUES ';
const domains = {
  cleric: [
    'forge',
    'light',
    'death',
    'knowledge',
    'arcana',
    'nature',
    'life',
    'peace',
    'trickery',
    'order',
    'war',
    'grave',
    'twilight',
    'tempest',
  ],
  druid: [
    'circle of land (coast)',
    'circle of land (forest)',
    'circle of land (grasslands)',
    'circle of moon',
    'circle of shepherd',
    'circle of dreams',
    'circle of spores',
  ],
  warlock: [
    'hexblade',
    'fathomless',
    'undead',
    'archfey',
    'celestial',
    'undying',
  ],
};

for (const domain of Object.keys(domains)) {
  for (const name of domains[domain]) {
    domainInsert += `('${name}', '${domain}'),`;
  }
}
domainInsert = domainInsert.substring(0, domainInsert.length - 1) + ';';
console.log(domainInsert);
