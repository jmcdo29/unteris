import { TabsWithPanel } from '@unteris/ui/components';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Suspense, SyntheticEvent } from 'react';
import { racesAtom, raceIdAtom } from './atoms';

import { Race } from './race';

const indexAtom = atom(0);

export const UiRace = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useAtom(indexAtom);
  const races = useAtomValue(racesAtom);
  const setRaceId = useSetAtom(raceIdAtom);

  const handleTabChange = (_event: SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
    setRaceId(races[newIndex].id);
  };

  return (
    <Suspense>
      <TabsWithPanel
        ariaLabel="homebrew race tab picker"
        tabIndex={tabIndex}
        handleTabChange={handleTabChange}
        tabElements={races}
        tabPanelContent={() => <Race />}
      />
    </Suspense>
  );
};
