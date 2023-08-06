import { TabbedNavigator } from '@unteris/ui/components';
import { atom } from 'jotai';
import { Suspense } from 'react';
import { locationIdAtom, locationsAtom } from './atoms';
import { DeityPicker } from './diety-picker';

const indexAtom = atom(0);

export const DeityNav = (): JSX.Element => {
  return (
    <Suspense>
      <TabbedNavigator
        label="hombrew deity location tab picker"
        resourceAtom={locationsAtom}
        idAtom={locationIdAtom}
        indexAtom={indexAtom}
        tabPanelContent={() => <DeityPicker />}
      />
    </Suspense>
  );
};
