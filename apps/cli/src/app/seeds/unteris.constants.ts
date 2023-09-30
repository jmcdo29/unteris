import { Deity, Race, RacialAbility } from "@unteris/shared/types";
import { Insertable } from "kysely";

const arboria = "Caelaum Arboria";
const sea = "Empyrean Sea";
const being = "Empyrean Being";
const child = "Empyrean Child";
const feywild = "Feywild";
const seelie = "Seelie Court";
const unseelie = "Unseelie Court";
const shadow = "Shadowfell";
const shadowfell = "Shadowfell";

export const categories = [being, child, seelie, unseelie, shadowfell];
export const planes = [sea, arboria, feywild, shadow];
export const regions = [
	"Frosdain",
	"Monstera",
	"Sabu",
	"Viridiem",
	"Vistem",
] as const;
export const cities: Record<typeof regions[number], string[]> = {
	Frosdain: [
		"Avanix",
		"Crystalmaw",
		"Glaize",
		"Saberglass",
		"Snowhunt",
		"Wyndfair",
	],
	Monstera: [
		"Aderberg",
		"Drakes Pass",
		"Ironfell",
		"Knightmount",
		"Luna Vein",
		"Taka Rest",
	],
	Sabu: [
		"Dryacre",
		"Bonespire",
		"Goldburn",
		"Kimare",
		"Maloka",
		"Meadowrest",
		"Nevergrove",
		"Oasis Fortuna",
		"Sandrest",
		"Scorchfell",
		"Terae",
		"Volnova",
	],
	Viridiem: [
		"Angelbury",
		"Dawncrest",
		"Ebonwood",
		"Foxvale",
		"Golmars",
		"Roseport",
		"Wildemoor",
		"Uma R&D",
	],
	Vistem: [
		"Grassmire",
		"Haven",
		"Hollowrock",
		"Keygarde",
		"Moonsgate",
		"Prismaglen",
		"Shadewick",
		"Starwood Village",
		"Sunpoint",
	],
};
export const deities: Array<
	Omit<Insertable<Deity>, "imageId" | "id"> & {
		category: string;
		location: string;
	}
> = [
	{
		name: "Pomdra",
		description:
			"The Empyrean Being who descended from the clouds and used their power to sew Unteris together as well as planted the Vitoak in the middle. They created the first Celestials to watch over the growth of the Vitoak.",
		category: being,
		location: sea,
	},
	{
		name: "Venlustel",
		description:
			"The Empyrean who races across the Auroras throughout the Empyrean Sea. They descended down to the Material Plane and placed wisps of light that opened the Material Plane up to others and allowed for faster travel.",
		category: being,
		location: sea,
	},
	{
		name: "Felvcor",
		description:
			"The Empyrean who plants the stars. Their Horns are a lustrous and iridescent color that is used to spread out stardust in order to fertilize the path they walk. They descended down to the Material Plane after Venlustel in order to initiate a new growth.",
		category: being,
		location: sea,
	},
	{
		name: "Latubor",
		description:
			"The Empyrean Being who bears Order and Chaos. They flew from the Empyrean Sea down to the Material Plane, endowing the land with their feathers and bringing thoughts to the faceless.",
		category: being,
		location: sea,
	},
	{
		name: "The Everfather",
		description:
			"From the stardust emerged a grand forest and from that forest emerged The Everfather. With his new gift of life, he empowered the forest and helped some of the faceless evolve into The Fey.",
		category: child,
		location: arboria,
	},
	{
		name: "Amashia",
		description: `Rising from one of Latubor's Feathers that had landed in a handful of Felvcor's stardust was Lady Amashia. She was filled with appreciation for what she saw in front of her. She danced around the surface and nurtured the faceless she came into contact with. Eventually, Halflings and Gnomes evolved from the faceless that interacted with her.`,
		category: child,
		location: arboria,
	},
	{
		name: "Fortuna",
		description: `Born from Latubor's feathers, Fortuna enjoyed playing with the chances and flow of chaos. It is said she also fell in love with the Halflings and that is why they're so lucky.`,
		category: child,
		location: arboria,
	},
	{
		name: "Jarekos",
		description:
			"When Venlustel raced over the Grand Forest, one of his wisps started to grow. Jarekos emerged from the light and swiftly took to his new surroundings, making his own tools and hunting for sustenance.",
		category: child,
		location: arboria,
	},
	{
		name: "Kor Amare",
		description: `When the first leaf of the Vitoak fell, it landed on Felvcor's antlers. After being shook off, the leaf transformed in Kor Amare. They were full of life and wanted to continue helping it to cultivate and grow.`,
		category: child,
		location: arboria,
	},
	{
		name: "Kurio",
		description: `Born of the same feather that became Fortuna, Kurio embodied the 'thoughts'. He wanted to seek out knowledge with every step he took and had a tendency to wander far.`,
		category: child,
		location: arboria,
	},
	{
		name: "Lacuna",
		description:
			"As Venlustel raced around, winds were whipped up and disturbed the water. Stardust rained down onto the raging waves and Lacuna strutted out of the waters.",
		category: child,
		location: arboria,
	},
	{
		name: "Lux",
		description:
			"Some of the stardust collected into a pile; half in the sun, half in the shadow. From the sun walked Lux. She is warm and comforting, but can hold a wicked grudge.",
		category: child,
		location: arboria,
	},
	{
		name: "Militaris",
		description:
			"Thanks to Latubor bringing thoughts to the faceless, soon walked out of the collective minds Militaris. He saw the rage filled mess that they fought in and began teaching how to fight with strategy against the monsters.",
		category: child,
		location: arboria,
	},
	{
		name: "Mors",
		description:
			"The faceless were not immortal, but it seemed they could not leave in peace as they had no idea where to go. From the blood emerged Mors and he shepherded away those who were done with the Material Plane.",
		category: child,
		location: arboria,
	},
	{
		name: "Ordin",
		description:
			"Chaos and Thought were born first from Latubor and soon after came Ordin, the embodiment of Order.",
		category: child,
		location: arboria,
	},
	{
		name: "Proecerta",
		description:
			"When Militaris emerged from collective thoughts, Proecerta emerged from the survivalist needs. She maintained a strong connection to all types of battle, survival, war, and sport.",
		category: child,
		location: arboria,
	},
	{
		name: "Rz",
		description:
			"A small wisp, a  broken feather and a chipped antler landed in a pile of stardust together forming Rz, but without arms as the pieces were incomplete. Jarekos helped created her arms and she fell in love with the act itself. She kept creating more and more things.",
		category: child,
		location: arboria,
	},
	{
		name: "Thirio",
		description:
			"One of the monsters consumed some of the stardust and changed into Thirio. The blood of the beasts coursed through his veins, but now thought did as well. He separated himself from the mindless creatures and created his own kin. All manner of beasts with thought.",
		category: child,
		location: arboria,
	},
	{
		name: "Tsumi",
		description:
			"As the stardust collected onto the waters, bubbles appeared. More and more as time passed until they all popped at once. Standing where the bubbles had gathered was Tsumi.",
		category: child,
		location: arboria,
	},
	{
		name: "Umbra",
		description:
			"Some of the stardust collected into a pile; half in the sun, half in the shadow. From the shadow walked out Umbra. He reflects the calmness that appears with the rising of the moon, as well as the mystery and danger",
		category: child,
		location: arboria,
	},
	{
		name: "Viridi",
		description:
			"As Felvcor plowed the ground and planted seeds, some of his stardust fertilized the ground. From the most hardy of them grew Viridi. She helped harvest the food and keep it fresh for all to enjoy and eat.",
		category: child,
		location: arboria,
	},
	{
		name: "Queen Titania",
		description: `Ruler of the Feywild, Elder Daughter of The Everfather. She's highly amused by mortals and has been known to take some as lovers.`,
		category: seelie,
		location: feywild,
	},
	{
		name: "King Oberon",
		description:
			"Secondary ruler of the Feywild. Marriage of Convenience. He tends to pay more attention to his own interests more than anything. Has taken on other lovers for a quick fling.",
		category: seelie,
		location: feywild,
	},
	{
		name: "Tadhg",
		description:
			"Tadhg is known as the Fair Poet, He follows whichever way the wind blows while playing a lyre made from a tortoise shell.",
		category: seelie,
		location: feywild,
	},
	{
		name: "Aodhan",
		description:
			"Guardian of the Fey Beasts, The first Satyr. Aodhan is a motherly type to those she cares about, which also makes her dangerous should someone threaten her kin.",
		category: seelie,
		location: feywild,
	},
	{
		name: "Caoimhe",
		description: `Queen Titania's eldest daughter, known as the Dreamy Princess. Caoimhe always seems to have her head in the clouds and comes off very distant.`,
		category: seelie,
		location: feywild,
	},
	{
		name: "Queen Eira",
		description: `Ruler of the Unseelie Court, Queen Titania's twin sister, yet Second Born. She enjoys watching how mortals handle being dealt a bad hand. Succeed and she's amused, fail and she's giddy.`,
		category: unseelie,
		location: feywild,
	},
	{
		name: "Branok",
		description:
			"The Black Wings. One of the most mischievous members of the Unseelie as well as one of the most intelligent. If there are ever three or more ravens watching you, most likely it is the servants of Branok.",
		category: unseelie,
		location: feywild,
	},
	{
		name: "Ciaradh",
		description:
			"Duchess of Misery. Ciaradh loves to make pacts with those who are the most miserable. She may grant you what you seek, but expect to suffer even more.",
		category: unseelie,
		location: feywild,
	},
	{
		name: "Lady Daeris",
		description:
			"Born from the dark eruption, she cultivated the Shadowfell to represent her own ideals.",
		category: shadow,
		location: shadowfell,
	},
	{
		name: "Klinge Seele",
		description:
			"The first thing Daeris wanted was someone who could craft weapons. Klinge Seele was born from shadow corrupted ore and lava, known throughout the darkness as the Ultimate Blacksmith.",
		category: shadow,
		location: shadowfell,
	},
	{
		name: "Verfell",
		description: `The shadows brought many things to life, but Verfell wasn't necessarily alive. He was born of the forgotten skeletons covered by fungi and decay`,
		category: shadow,
		location: shadowfell,
	},
	{
		name: "Meister Spinne",
		description:
			"Spider Lord. Arachnids, in general, prefer the darkness. And so, the explosion mutated and morphed one of them. Twisted and hunger always growing, Meister Spinne was methodical and patient. Waiting for the perfect moment to catch someone within his webs",
		category: shadow,
		location: shadowfell,
	},
	{
		name: "Krypta Vatcher",
		description:
			"Someone had to keep the darkness and undead in check. Krypta Vatcher walked out of the shadows with chains ready to detain any deemed necessary.",
		category: shadow,
		location: shadowfell,
	},
];
export const domains: Record<"cleric" | "druid" | "warlock", string[]> = {
	cleric: [
		"forge",
		"light",
		"death",
		"knowledge",
		"arcana",
		"nature",
		"life",
		"peace",
		"trickery",
		"order",
		"war",
		"grave",
		"twilight",
		"tempest",
	],
	druid: [
		"circle of land (coast)",
		"circle of land (forest)",
		"circle of land (grasslands)",
		"circle of moon",
		"circle of shepherd",
		"circle of dreams",
		"circle of spores",
	],
	warlock: [
		"hexblade",
		"fathomless",
		"undead",
		"archfey",
		"celestial",
		"undying",
	],
};
export const races: Array<
	Omit<Race, "id"> & {
		racialAbilities: Omit<RacialAbility, "id" | "raceId">[];
	}
> = [
	{
		name: "Naga",
		description:
			"A Naga possesses a humanoid head and torso and a long, serpentine tail. They are generally slender, with lithe bodies that, in some cases, mask the strength hidden within their reptilian musculature. Their eyes have a reptilian slit pupil, and they boast an impressive set of teeth more akin to a dragon than those of a snake. Males tend to be dark and more colorful while females tend to be more muted.",
		type: "humanoid",
		ageDescription:
			"Nagas reach maturity at 15 and can live anywhere from 750 to 850 years.",
		sizeDescription:
			"Naga are as varied as snakes. They can be either Medium or Small",
		speed: 30,
		racialAbilities: [
			{
				name: "Constrict",
				description:
					"A Naga can constrict a foe with its powerful tail. You can grapple creatures within 10 (5 if small) feet of you with your tail. When you grapple a creature with your tail, your speed is reduced to 0. When you grapple a creature with your tail you can use both your hands as normal.",
			},
			{
				name: "Darkvision",
				description: `You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.`,
			},
			{
				name: "Poisonous Spit",
				description:
					"You can summon and spit magical poison against your foes. You know the poison spray cantrip. Constitution is your spellcasting ability for this spell.",
			},
			{
				name: "Scaled",
				description:
					"Nagas scales are thick. While not wearing armor, your armor class is equal to 13 + your Dexterity modifier. You can carry a shield and still gain the benefits of this trait.",
			},
			{
				name: "Scavenger and Predator",
				description:
					"From a young age, Naga learn to forage for themselves, either through hunting game or by foraging for food. You are Proficient in the Survival Skill",
			},
		],
		knownLanguages: "You can speak, read and write Common and Nagan.",
	},
	{
		name: "Siren",
		description:
			"Syrens are the strong, beautiful guardians of the seas, acclimated to the oceans and survival underwater. Most people don't realize that Syrens exist due to them very rarely leaving the ocean. Most are mistaken for Water Genasi",
		type: "humanoid",
		ageDescription:
			"Syrens reach physical maturity at the same rate as humans, but can live up to a thousand years.",
		sizeDescription:
			"Your size is medium. Males tend to be smaller and average between 4'8-5'8 ft while Females average between 6'8-7'8",
		speed: 30,
		racialAbilities: [
			{
				name: "Amphibious",
				description: "Can breathe both air and water.",
			},
			{
				name: "Aquatic Vision",
				description:
					"Thanks to growing up in deep waters, you have Darkvision.",
			},
			{
				name: "Deep Diver",
				description:
					"Syrens are well-adapted to the harsh, cold environments of ocean depths. You have resistance to cold damage.",
			},
			{
				name: `Syren's Body`,
				description:
					"As a bonus action, you can shift your tail to legs and vice versa. While you have a tail, your walking speed is 5ft and swim speed is 40ft",
			},
			{
				name: "Marine Recovery",
				description:
					"If you complete a short while fully submerged in water throughout, you can gain temp hit points equal to your Constitution Modifier",
			},
		],
		knownLanguages: "You can speak, read, and write Aquan and Common.",
	},
	{
		name: "Felvos",
		description:
			"Felvos resemble housecats that walk on two legs. It is said that they descended from a line of Tabaxi that grew far too comfortable in an urban setting.",
		type: "humanoid",
		ageDescription:
			"Felvos age at around the same rate as humans, reaching middle age at around 50, and rarely living longer than 110.",
		sizeDescription:
			"Felvos are short and lithe, standing between 2 and 3 feet. Your size is small.",
		speed: 30,
		racialAbilities: [
			{
				name: "Darkvision",
				description:
					"You have a cat’s keen senses especially in the dark. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.",
			},
			{
				name: "Feline Agility",
				description:
					"You gain proficiency in the Acrobatics skill, and your jump distance is doubled.",
			},
			{
				name: "Trust Me",
				description:
					"You gain proficiency in persuasion, deception, and performance skills. Your proficiency bonus is doubled for any check you make with these skills.",
			},
		],
		knownLanguages:
			"You can speak, read and write Common and one other language of your choice.",
	},
	{
		name: "Kitsune",
		description:
			"Kitsune are a magical race of otherworldly beauty, living in the world but not entirely part of it. They live in places of ancient magic, thick labyrinth like forests. The fox-like creatures love nature and magic, art and artistry, music and poetry, trickery and the good things of the world.",
		type: "Fey",
		ageDescription:
			"Kitsune reach physical maturity at about the same age as humans and can live up to 500 years.",
		sizeDescription: `Kitsune's Shifted Form range widely and have slender builds. Your size is Medium or Small.`,
		speed: 30,
		racialAbilities: [
			{
				name: "Darkvision",
				description:
					"Accustomed to twilit forests and the night sky, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.",
			},
			{
				name: "Keen Senses",
				description: "You have proficiency in the Perception skill",
			},
			{
				name: "Shapeshifter",
				description: `All Kitsune can use old magic to take on a Humanoid form. You can use an action to change your form into a Humanoid of Medium or Small size. All Kitsune have a permanent altered for. This form's appearance is decided when this ability is used for the first time.\\nYou decide your skin color, hair length, sex, height, weight, and race. Though none of your game statistics change. Your clothing and equipment aren't changed by this trait.\\n(Unlike changelings, you do not get to change your appearance every time you use this feature. Once you choose, that's it.)\\nYou stay in this altered form until you use an action to revert to your true form or until you die.`,
			},
		],
		knownLanguages: "You can speak, read, and write Common and Sylvan.",
	},
];
export const images = [
	"pomdra.jpg",
	"venlustel.png",
	"felvcor.jpg",
	"latubor.jpg",
	"everfather.png",
	"amashia.png",
	"fortuna.png",
	"jarekos.png",
	"kor_amare.png",
	"kurio.png",
	"lacuna.png",
	"lux.png",
	"militaris.png",
	"mors.png",
	"ordin.png",
	"proecerta.png",
	"rz.png",
	"thirio.png",
	"tsumi.png",
	"umbra.png",
	"viridi.png",
	"queen_titania.png",
	"king_oberon.png",
	"tadhg.png",
	"aodhan.png",
	"caoimhe.png",
	"queen_eira.png",
	"branok.png",
	"ciaradh.png",
	"lady_daeris.png",
	"klinge_seele.png",
	"verfell.png",
	"meister_spinne.png",
	"krypta_vatcher.png",
];
export const deityDomains: Record<string, Record<string, string[]>> = {
	"The Everfather": {
		cleric: ["arcana", "nature", "knowledge"],
		druid: ["circle of dreams"],
		warlock: ["archfey"],
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
		cleric: ["knowledge"],
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
		druid: ["circle of moon", "circle of shepherd"],
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
	Ciaradh: {
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
