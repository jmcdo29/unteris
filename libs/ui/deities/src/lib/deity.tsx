import Box from '@mui/material/Box';
import { useFetchEffect } from '@unteris/ui/components';
import { Deity as IDeity } from '@unteris/shared/types';
import { DeityEditor } from './deity-editor';
import { DeityViewer } from './deity-viewer';
import { useMediaQuery } from '@mui/material';
import { atom, useAtom, useAtomValue } from 'jotai';

import { editingAtom } from './atoms';

interface DeityProps {
  deity: Pick<IDeity, 'id' | 'name'>;
}

const deityAtom = atom<IDeity | undefined>(undefined);

export const Deity = (props: DeityProps): JSX.Element => {
  const isWideEnough = useMediaQuery('(min-width:600px)');
  const [deity, setDeity] = useAtom(deityAtom);
  const isEditing = useAtomValue(editingAtom);

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
        <DeityEditor deity={deity} setDeity={updateDeity} />
      ) : (
        <DeityViewer deity={deity} />
      )}
    </Box>
  );
};
