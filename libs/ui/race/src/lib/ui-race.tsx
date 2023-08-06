import { TabbedNavigator } from '@unteris/ui/components';
import { atom } from 'jotai';
import { Suspense } from 'react';
import { racesAtom, raceIdAtom } from './atoms';

import { Race } from './race';

const indexAtom = atom(0);

export const UiRace = (): JSX.Element => {
  return (
    <Suspense>
      <TabbedNavigator
        label="homebrew race tab picker"
        resourceAtom={racesAtom}
        idAtom={raceIdAtom}
        tabPanelContent={() => <Race />}
        indexAtom={indexAtom}
      />
    </Suspense>
  );
};
