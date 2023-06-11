import { Race as RaceType } from '@unteris/shared/types';
import { useFetchEffect, TabsWithPanel } from '@unteris/ui/components';
import { SyntheticEvent, useState } from 'react';

import { Race } from './race';

export const UiRace = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState(0);
  const [races, setRaces] = useState<RaceType[]>([]);

  useFetchEffect({
    endpoint: 'race',
    setter: setRaces,
    default: [],
  });

  const handleTabChange = (_event: SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <TabsWithPanel
      ariaLabel="homebrew race tab picker"
      tabIndex={tabIndex}
      handleTabChange={handleTabChange}
      tabElements={races}
      tabPanelContent={(race) => {
        return <Race race={race} />;
      }}
    />
  );
};
