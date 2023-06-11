import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import { Race as IRace, RaceWithAbilities } from '@unteris/shared/types';
import { useFetchEffect } from '@unteris/ui/components';
import { useState } from 'react';

import { RaceViewer } from './race-viewer';
import { RaceEditor } from './race-editor';

interface RaceProps {
  race: Pick<IRace, 'id' | 'name'>;
}

export const Race = (props: RaceProps): JSX.Element => {
  const isWideEnough = useMediaQuery('(min-width:600px)');
  const [race, setRace] = useState<RaceWithAbilities>();
  const [isEditing, setIsEditing] = useState(false);

  useFetchEffect({
    endpoint: `race/${props.race.id}`,
    default: undefined,
    setter: setRace,
  });

  const updateRace = (_race: IRace) => {
    /* this is where I'll call back to the server to save */
  };

  if (!race) {
    return <div />;
  }

  return (
    <Box padding={`${!isWideEnough ? '1em' : '0'} 1em`}>
      {isEditing ? (
        <RaceEditor
          race={race}
          setRace={updateRace}
          setIsEditing={setIsEditing}
        />
      ) : (
        <RaceViewer race={race} setIsEditing={setIsEditing} />
      )}
    </Box>
  );
};
