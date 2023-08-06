import { TabbedNavigator } from '@unteris/ui/components';
import { Suspense } from 'react';
import { locationIndexAtom, locationsAtom } from './atoms';
import { DeityPicker } from './diety-picker';

export const DeityNav = (): JSX.Element => {
  return (
    <Suspense>
      <TabbedNavigator
        label="hombrew deity location tab picker"
        resourceAtom={locationsAtom}
        indexAtom={locationIndexAtom}
        tabPanelContent={() => <DeityPicker />}
      />
    </Suspense>
  );
};
