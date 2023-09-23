let categoriesInsert = 'INSERT INTO deity_category (name) VALUES ';

const categories = [
	'Empyrean Being',
	'Empyrean Child',
	'Seelie Court',
	'Unseelie Court',
	'Shadowfell',
];

for (const cat of categories) {
	categoriesInsert += `('${cat}'),`;
}

console.log(`${categoriesInsert.substring(0, categoriesInsert.length - 1)};`);
