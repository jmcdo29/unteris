let deityInsert =
  'INSERT INTO deity (name, description, image_url, category, location) VALUES ';
const arboria = 'Caelaum Arboria';
const sea = 'Empyrean Sea';
const being = 'Empyrean Being';
const child = 'Empyrean Child';
const feywild = 'Feywild';
const seelie = 'Seelie Court';
const unseelie = 'Unseelie Court';
const shadow = 'Shadowfell';
const shadowfell = 'Shadowfell';
const material = 'Material Plane';

const deities = [
  {
    name: 'Pomdra',
    description:
      'The Empyrean Being who descended from the clouds and used their power to sew Unteris together as well as planted the Vitoak in the middle. They created the first Celestials to watch over the growth of the Vitoak.',
    imageUrl: 'pomdra.jpg',
    category: being,
    location: sea,
  },
  {
    name: 'Venlustel',
    description:
      'The Empyrean who races across the Auroras throughout the Empyrean Sea. They descended down to the Material Plane and placed wisps of light that opened the Material Plane up to others and allowed for faster travel.',
    imageUrl: 'venlustel.png',
    category: being,
    location: sea,
  },
  {
    name: 'Felvcor',
    description:
      'The Empyrean who plants the stars. Their Horns are a lustrous and iridescent color that is used to spread out stardust in order to fertilize the path they walk. They descended down to the Material Plane after Venlustel in order to initiate a new growth.',
    imageUrl: 'felvcor.jpg',
    category: being,
    location: sea,
  },
  {
    name: 'Latubor',
    description:
      'The Empyrean Being who bears Order and Chaos. They flew from the Empyrean Sea down to the Material Plane, endowing the land with their feathers and bringing thoughts to the faceless.',
    imageUrl: 'latubor.jpg',
    category: being,
    location: sea,
  },
  {
    name: 'The Everfather',
    description:
      'From the stardust emerged a grand forest and from that forest emerged The Everfather. With his new gift of life, he empowered the forest and helped some of the faceless evolve into The Fey.',
    imageUrl: 'everfather.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Amashia',
    description: `Rising from one of Latubor's Feathers that had landed in a handful of Felvcor's stardust was Lady Amashia. She was filled with appreciation for what she saw in front of her. She danced around the surface and nurtured the faceless she came into contact with. Eventually, Halflings and Gnomes evolved from the faceless that interacted with her.`,
    imageUrl: 'amashia.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Fortuna',
    description: `Born from Latubor's feathers, Fortuna enjoyed playing with the chances and flow of chaos. It is said she also fell in love with the Halflings and that is why they're so lucky.`,
    imageUrl: 'fortuna.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Jarekos',
    description:
      'When Venlustel raced over the Grand Forest, one of his wisps started to grow. Jarekos emerged from the light and swiftly took to his new surroundings, making his own tools and hunting for sustenance.',
    imageUrl: 'jarekos.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Kor Amare',
    description: `When the first leaf of the Vitoak fell, it landed on Felvcor's antlers. After being shook off, the leaf transformed in Kor Amare. They were full of life and wanted to continue helping it to cultivate and grow.`,
    imageUrl: 'kor_amare.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Kurio',
    description: `Born of the same feather that became Fortuna, Kurio embodied the 'thoughts'. He wanted to seek out knowledge with every step he took and had a tendency to wander far.`,
    imageUrl: 'kurio.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Lacuna',
    description:
      'As Venlustel raced around, winds were whipped up and disturbed the water. Stardust rained down onto the raging waves and Lacuna strutted out of the waters.',
    imageUrl: 'lacuna.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Lux',
    description:
      'Some of the stardust collected into a pile; half in the sun, half in the shadow. From the sun walked Lux. She is warm and comforting, but can hold a wicked grudge.',
    imageUrl: 'lux.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Militaris',
    description:
      'Thanks to Latubor bringing thoughts to the faceless, soon walked out of the collective minds Militaris. He saw the rage filled mess that they fought in and began teaching how to fight with strategy against the monsters.',
    imageUrl: 'militaris.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Mors',
    description:
      'The faceless were not immortal, but it seemed they could not leave in peace as they had no idea where to go. From the blood emerged Mors and he shepherded away those who were done with the Material Plane.',
    imageUrl: 'mors.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Ordin',
    description:
      'Chaos and Thought were born first from Latubor and soon after came Ordin, the embodiment of Order.',
    imageUrl: 'ordin.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Proecerta',
    description:
      'When Militaris emerged from collective thoughts, Proecerta emerged from the survivalist needs. She maintained a strong connection to all types of battle, survival, war, and sport.',
    imageUrl: 'proecerta.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Rz',
    description:
      'A small wisp, a  broken feather and a chipped antler landed in a pile of stardust together forming Rz, but without arms as the pieces were incomplete. Jarekos helped created her arms and she fell in love with the act itself. She kept creating more and more things.',
    imageUrl: 'rz.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Thirio',
    description:
      'One of the monsters consumed some of the stardust and changed into Thirio. The blood of the beasts coursed through his veins, but now thought did as well. He separeted himself from the mindless creatures and created his own kin. All manner of beasts with thought.',
    imageUrl: 'thirio.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Tsumi',
    description:
      'As the stardust collected onto the waters, bubbles appeared. More and more as time passed until they all popped at once. Standing where the bubbles had gathered was Tsumi.',
    imageUrl: 'tsumi.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Umbra',
    description:
      'Some of the stardust collected into a pile; half in the sun, half in the shadow. From the shadow walked out Umbra. He reflects the calmness that appears with the rising of the moon, as well as the mystery and danger',
    imageUrl: 'umbra.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Viridi',
    description:
      'As Felvcor plowed the ground and planted seeds, some of his stardust fertilized the ground. From the most hardy of them grew Viridi. She helped harvest the food and keep it fresh for all to enjoy and eat.',
    imageUrl: 'viridi.png',
    category: child,
    location: arboria,
  },
  {
    name: 'Queen Titania',
    description: `Ruler of the Feywild, Elder Daughter of The Everfather. She's highly amused by mortals and has been known to take some as lovers.`,
    imageUrl: 'queen_titania.png',
    category: seelie,
    location: feywild,
  },
  {
    name: 'King Oberon',
    description: `Secondary ruler of the Feywild. Marriage of Convenience. He tends to pay more attention to his own interests more than anything. Has taken on other lovers for a quick fling.`,
    imageUrl: 'king_oberon.png',
    category: seelie,
    location: feywild,
  },
  {
    name: 'Tadhg',
    description:
      'Tadhg is known as the Fair Poet, He follows whichever way the wind blows while playing a lyre made from a tortoise shell.',
    imageUrl: 'tadhg.png',
    category: seelie,
    location: feywild,
  },
  {
    name: 'Aodhan',
    description:
      'Guardian of the Fey Beasts, The first Satyr. Aodhan is a motherly type to those she cares about, which also makes her dangerous should someone threaten her kin.',
    imageUrl: 'aodhan.png',
    category: seelie,
    location: feywild,
  },
  {
    name: 'Caoimhe',
    description: `Queen Titania's eldest daughter, known as the Dreamy Princess. Caoimhe always seems to have her head in the clouds and comes off very distant.`,
    imageUrl: 'caoimhe.png',
    category: seelie,
    location: feywild,
  },
  {
    name: 'Queen Eira',
    description: `Ruler of the Unseelie Court, Queen Titania's twin sister, yet Second Born. She enjoys watching how mortals handle being dealt a bad hand. Succeed and she's amused, fail and she's giddy.`,
    imageUrl: 'queen_eira.png',
    category: unseelie,
    location: feywild,
  },
  {
    name: 'Branok',
    description:
      'The Black Wings. One of the most mischievous members of the Unseelie as well as one of the most intelligent. If there are ever three or more ravens watching you, most likely it is the servants of Branok.',
    imageUrl: 'branok.png',
    category: unseelie,
    location: feywild,
  },
  {
    name: 'Ciaradh',
    description:
      'Duchess of Misery. Ciaradh loves to make pacts with those who are the most miserable. She may grant you what you seek, but expect to suffer even more.',
    imageUrl: 'ciaradh.png',
    category: unseelie,
    location: feywild,
  },
  {
    name: 'Lady Daeris',
    description:
      'Born from the dark eruption, she cultivated the Shadowfell to represent her own ideals.',
    imageUrl: 'lady_daeris.png',
    category: shadow,
    location: shadowfell,
  },
  {
    name: 'Klinge Seele',
    description:
      'The first thing Daeris wanted was someone who could craft weapons. Klinge Seele was born from shadow corrupted ore and lava, known throughout the darkness as the Ultimate Blacksmith.',
    imageUrl: 'klinge_seele.png',
    category: shadow,
    location: shadowfell,
  },
  {
    name: 'Verfell',
    description: `The shadows brought many things to life, but Verfell wasn't necessarily alive. He was born of the forgotten skeletons covered by fungi and decay`,
    imageUrl: 'verfell.png',
    category: shadow,
    location: shadowfell,
  },
  {
    name: 'Meister Spinne',
    description:
      'Spider Lord. Arachnids, in general, prefer the darkness. And so, the explosion mutated and morphed one of them. Twisted and hunger always growing, Meister Spinne was methodical and patient. Waiting for the perfect moment to catch someone within his webs',
    imageUrl: 'meister_spinne.png',
    category: shadow,
    location: shadowfell,
  },
  {
    name: 'Krypta Vatcher',
    description:
      'Someone had to keep the darkness and undead in check. Krypta Vatcher walked out of the shadows with chains ready to detain any deemed necessary.',
    imageUrl: 'krypta_vatcher.png',
    category: shadow,
    location: shadowfell,
  },
];

for (const deity of deities) {
  deityInsert += `('${deity.name}', '${deity.description.replaceAll(
    `'`,
    `''`
  )}', './images/${
    deity.imageUrl
  }', (SELECT id FROM deity_category WHERE name = '${
    deity.category
  }'), (SELECT id FROM location WHERE name = '${deity.location}')),`;
}

deityInsert = deityInsert.substring(0, deityInsert.length - 1) + ';';
console.log(deityInsert);
