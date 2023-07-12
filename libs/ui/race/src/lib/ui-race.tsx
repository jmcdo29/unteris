import { Race as RaceType } from '@unteris/shared/types';
import { useFetchEffect, TabsWithPanel } from '@unteris/ui/components';
import { atom, useAtom } from 'jotai';
import { SyntheticEvent } from 'react';

import { Race } from './race';

const indexAtom = atom(0);
const racesAtom = atom<RaceType[]>([]);

export const UiRace = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useAtom(indexAtom);
  const [races, setRaces] = useAtom(racesAtom);

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
