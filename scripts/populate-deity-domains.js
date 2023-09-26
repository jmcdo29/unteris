let deityDomainInsert =
	"INSERT INTO deity_domain (deity_id, domain_id) VALUES ";
const deities = {
	"The Everfather": {
		cleric: ["arcana", "nature", "knowledge"],
		druid: ["circle of dreams"],
		wralock: ["archfey"],
	},
	Amashia: {
		cleric: ["life", "peace"],
		warlock: ["celestial"],
	},
	Fortuna: {
		cleric: ["trickery"],
	},
	Jarekos: {
		cleric: ["forge", "nature"],
	},
	"Kor Amare": {
		cleric: ["life"],
		warlock: ["celestial"],
	},
	Kurio: {
		celric: ["knowledge"],
	},
	Lacuna: {
		cleric: ["tempest"],
		warlock: ["fathomless"],
	},
	Lux: {
		cleric: ["light"],
	},
	Militaris: {
		cleric: ["war", "order"],
	},
	Mors: {
		cleric: ["death", "grave"],
	},
	Ordin: {
		cleric: ["order"],
	},
	Proecerta: {
		cleric: ["war"],
	},
	Rz: {
		cleric: ["forge"],
	},
	Thirio: {
		cleric: ["nature"],
		druid: ["circle of moon", "circle of shephard"],
	},
	Tsumi: {
		cleric: ["tempest"],
		druid: ["circle of land (coast)"],
	},
	Umbra: {
		cleric: ["twilight"],
	},
	Viridi: {
		cleric: ["life", "nature"],
		druid: ["circle of land (forest)", "circle of land (grasslands)"],
	},
	"Queen Titania": {
		warlock: ["archfey"],
	},
	"King Oberon": {
		warlock: ["archfey"],
	},
	Tadhg: {
		warlock: ["archfey"],
	},
	Aodhan: {
		cleric: ["nature"],
		warlock: ["archfey"],
	},
	Caoimhe: {
		druid: ["circle of dreams"],
		warlock: ["archfey"],
	},
	"Queen Eira": {
		warlock: ["archfey"],
	},
	Branok: {
		warlock: ["archfey"],
	},
	Cairadh: {
		warlock: ["archfey"],
	},
	"Lady Daeris": {
		warlock: ["undead"],
	},
	"Klinge Seele": {
		warlock: ["hexblade"],
	},
	Verfell: {
		druid: ["circle of spores"],
		warlock: ["undying"],
	},
	"Krypta Vatcher": {
		cleric: ["grave"],
		warlock: ["undying"],
	},
};

for (const deityName of Object.keys(deities)) {
	const deity = deities[deityName];
	for (const type of Object.keys(deity)) {
		for (const domain of deity[type]) {
			deityDomainInsert += `((SELECT id FROM deity WHERE name = '${deityName}'), (SELECT id FROM domain WHERE name = '${domain}')),`;
		}
	}
}

console.log(`${deityDomainInsert.substring(0, deityDomainInsert.length - 1)};`);
