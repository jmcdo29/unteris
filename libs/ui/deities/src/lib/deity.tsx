import { useEffect, useState } from 'react';
import type { Deity as IDeity } from './deity.interface';
import { DeityEditor } from './deity-editor';
import { DeityViewer } from './deity-viewer';

const deities: Record<string, IDeity> = {
  Pomdra: {
    description:
      'The Empyrean Being who descended from the clouds and used their power to sew Unteris together as well as planted the Vitoak in the middle. They created the first Celestials to watch over the growth of the Vitoak.',
    imageUrl: '/pomdra.jpg',
    name: 'Pomdra',
  },
  Venlustel: {
    description:
      'The Empyrean who races across the Auroras throughout the Empyrean Sea. They descended down to the Material Plane and placed wisps of light that opened the Material Plane up to others and allowed for faster travel.',
    imageUrl: '/venlustel.png',
    name: 'Venlustel',
  },
  Felvcor: {
    name: 'Felvcor',
    description:
      'The Empyrean who plants the stars. Their Horns are a lustrous and iridescent color that is used to spread out stardust in order to fertilize the path they walk. They descended down to the Material Plane after Venlustel in order to initiate a new growth.',
    imageUrl: '/felvcor.jpg',
  },
  Latubor: {
    name: 'Latubor',
    description:
      'The Empyrean Being who bears Order and Chaos. They flew from the Empyrean Sea down to the Material Plane, endowing the land with their feathers and bringing thoughts to the faceless.',
    imageUrl: '/latubor.jpg',
  },
};

interface DeityProps {
  name: string;
}

export const Deity = (props: DeityProps): JSX.Element => {
  const [deity, setDeity] = useState<IDeity>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTimeout(() => setDeity(deities[props.name]), 500);
  }, [setDeity]);

  const updateDeity = (deity: IDeity) => {
    deities[props.name] = deity;
    setDeity(deity);
  };

  if (!deity) {
    return <></>;
  }

  return isEditing ? (
    <DeityEditor
      deity={deity}
      setDeity={updateDeity}
      setIsEditing={setIsEditing}
    />
  ) : (
    <DeityViewer deity={deity} setIsEditing={setIsEditing} />
  );
};
