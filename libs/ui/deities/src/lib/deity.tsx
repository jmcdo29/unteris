import Box from '@mui/material/Box';
import { useState } from 'react';
import { useFetchEffect } from '@unteris/ui/components';
import type { Deity as IDeity } from './deity.interface';
import { DeityEditor } from './deity-editor';
import { DeityViewer } from './deity-viewer';
import { useMediaQuery } from '@mui/material';

interface DeityProps {
  deity: { id: string; name: string };
}

export const Deity = (props: DeityProps): JSX.Element => {
  const isWideEnough = useMediaQuery('(min-width:600px)');
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

  return (
    <Box padding={`${!isWideEnough ? '1em' : '0'} 1em`}>
      {isEditing ? (
        <DeityEditor
          deity={deity}
          setDeity={updateDeity}
          setIsEditing={setIsEditing}
        />
      ) : (
        <DeityViewer deity={deity} setIsEditing={setIsEditing} />
      )}
    </Box>
  );
};
