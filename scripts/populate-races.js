let raceInsert =
  'INSERT INTO race (name, description, type, age_description, size_description, speed, known_languages) VALUES ';
let abilityInsert =
  'INSERT INTO racial_ability (name, description, race_id) VALUES ';

const races = [
  {
    name: 'Naga',
    description:
      'A Naga possesses a humanoid head and torso and a long, serpentine tail. They are generally slender, with lithe bodies that, in some cases, mask the strength hidden within their reptilian musculature. Their eyes have a reptilian slit pupil, and they boast an impressive set of teeth more akin to a dragon than those of a snake. Males tend to be dark and more colorful while females tend to be more muted.',
    creatureType: 'humanoid',
    age: 'Nagas reach maturity at 15 and can live anywhere from 750 to 850 years.',
    size: 'Naga are as varied as snakes. They can be either Medium or Small',
    speed: 30,
    racialAbilities: [
      {
        name: 'Constrict',
        description:
          'A Naga can constrict a foe with its powerful tail. You can grapple creatures within 10 (5 if small) feet of you with your tail. When you grapple a creature with your tail, your speed is reduced to 0. When you grapple a creature with your tail you can use both your hands as normal.',
      },
      {
        name: 'Darkvision',
        description: `You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.`,
      },
      {
        name: 'Poisonous Spit',
        description:
          'You can summon and spit magical poison against your foes. You know the poison spray cantrip. Constitution is your spellcasting ability for this spell.',
      },
      {
        name: 'Scaled',
        description:
          'Nagas scales are thick. While not wearing armor, your armor class is equal to 13 + your Dexterity modifier. You can carry a shield and still gain the benefits of this trait.',
      },
      {
        name: 'Scavenger and Predator',
        description:
          'From a young age, Naga learn to forage for themselves, either through hunting game or by foraging for food. You are Proficient in the Survival Skill',
      },
    ],
    languages: 'You can speak, read and write Common, and Nagan.',
  },
  {
    name: 'Siren',
    description:
      'Syrens are the strong, beautiful guardians of the seas, acclimated to the oceans and survival underwater. Most people don’t realize that Syrens exist due to them very rarely leaving the ocean. Most are mistaken for Water Genasi',
    creatureType: 'humanoid',
    age: 'Syrens reach physical maturity at the same rate as humans, but can live up to a thousand years.',
    size: `Your size is medium. Males tend to be smaller and average between 4’8-5’8 ft while Females average between 6’8-7’8`,
    speed: 30,
    racialAbilities: [
      {
        name: 'Amphibious',
        description: 'Can breathe both air and water.',
      },
      {
        name: 'Aquatic Vision',
        description:
          'Thanks to growing up in deep waters, you have Darkvision.',
      },
      {
        name: 'Deep Diver',
        description:
          'Syrens are well-adapted to the harsh, cold environments of ocean depths. You have resistance to cold damage.',
      },
      {
        name: `Syren's Body`,
        description:
          'As a bonus action, you can shift your tail to legs and vice versa. While you have a tail, your walking speed is 5ft and swim speed is 40ft',
      },
      {
        name: 'Marine Recovery',
        description:
          'If you complete a short while fully submerged in water throughout, you can gain temp hit points equal to your Constitution Modifier',
      },
    ],
    languages: 'You can speak, read, and write Aquan and Common.',
  },
  {
    name: 'Felvos',
    description:
      'Felvos resemble housecats that walk on two legs. It is said that they descended from a line of Tabaxi that grew far too comfortable in an urban setting.',
    creatureType: 'humanoid',
    age: 'Felvos age at around the same rate as humans, reaching middle age at around 50, and rarely living longer than 110.',
    size: 'Felvos are short and lithe, standing between 2 and 3 feet. Your size is small.',
    speed: 30,
    racialAbilities: [
      {
        name: 'Darkvision',
        description:
          'You have a cat’s keen senses especially in the dark. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.',
      },
      {
        name: 'Feline Agility',
        description:
          'You gain proficiency in the Acrobatics skill, and your jump distance is doubled.',
      },
      {
        name: 'Trust Me',
        description:
          'You gain proficiency in persuasion, deception, and performance skills. Your proficiency bonus is doubled for any check you make with these skills.',
      },
    ],
    languages:
      'You can speak, read and write in Common, and one other language of your choice.',
  },
  {
    name: 'Kitsune',
    description:
      'Kitsune are a magical race of otherworldly beauty, living in the world but not entirely part of it. They live in places of ancient magic, thick labyrinth like forests. The fox-like creatures love nature and magic, art and artistry, music and poetry, trickery and the good things of the world.',
    creatureType: 'Fey',
    age: 'Kitsune reach physical maturity at about the same age as humans and can live up to 500 years.',
    size: `Kitsune's Shifted Form range widely and have slender builds. Your size is Medium or Small.`,
    speed: 30,
    racialAbilities: [
      {
        name: 'Darkvision',
        description:
          'Accustomed to twilit forests and the night sky, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.',
      },
      {
        name: 'Keen Senses',
        description: 'You have proficiency in the Perception skill',
      },
      {
        name: 'Shapeshifter',
        description: `All Kitsune can use old magic to take on a Humanoid form. You can use an action to change your form into a Humanoid of Medium or Small size. All Kitsune have a permanent altered for. This form's appearance is decided when this ability is used for the first time.\\nYou decide your skin color, hair length, sex, height, weight, and race. Though none of your game statistics change. Your clothing and equipment aren’t changed by this trait.\\n(Unlike changelings, you do not get to change your appearance every time you use this feature. Once you choose, that's it.)\\nYou stay in this altered form until you use an action to revert to your true form or until you die.`,
      },
    ],
    languages: 'You can speak, read, and write Common and Sylvan.',
  },
];

for (const race of races) {
  raceInsert += `('${race.name}', '${race.description}', '${
    race.creatureType
  }', '${race.age}', '${race.size.replaceAll(`'`, `''`)}', '${race.speed}', '${
    race.languages
  }'),`;
  for (const ability of race.racialAbilities) {
    abilityInsert += `('${ability.name.replaceAll(
      `'`,
      `''`
    )}', '${ability.description.replaceAll(
      `'`,
      `''`
    )}', (SELECT id FROM race WHERE name = '${race.name}')),`;
  }
}

console.log(raceInsert.substring(0, raceInsert.length - 1) + ';\n\n');
console.log(abilityInsert.substring(0, abilityInsert.length - 1) + ';');
