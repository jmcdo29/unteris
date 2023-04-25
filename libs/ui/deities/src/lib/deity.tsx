import { useState } from 'react';
import { useFetchEffect } from '@unteris/ui/components';
import type { Deity as IDeity } from './deity.interface';
import { DeityEditor } from './deity-editor';
import { DeityViewer } from './deity-viewer';

interface DeityProps {
  deity: { id: string; name: string };
}

export const Deity = (props: DeityProps): JSX.Element => {
  const [deity, setDeity] = useState<IDeity>();
  const [isEditing, setIsEditing] = useState(false);

  useFetchEffect({
    endpoint: `deities/id/${props.deity.id}`,
    default: undefined,
    setter: setDeity,
  });

  const updateDeity = (_deity: IDeity) => {
    /* this is where I'll call back to the server to save */
  };

  if (!deity) {
    return <div />;
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
