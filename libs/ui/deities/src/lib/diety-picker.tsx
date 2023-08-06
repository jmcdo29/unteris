import { TabbedNavigator } from '@unteris/ui/components';
import { atom } from 'jotai';
import { Suspense } from 'react';
import { deitiesForLocaitonAtom, deityIdAtom } from './atoms';
import { Deity } from './deity';

const indexAtom = atom(-1);

export const DeityPicker = (): JSX.Element => {
  return (
    <Suspense>
      <TabbedNavigator
        label="homebrew deity tab picker"
        resourceAtom={deitiesForLocaitonAtom}
        idAtom={deityIdAtom}
        indexAtom={indexAtom}
        tabPanelContent={() => <Deity />}
        indicator="secondary"
      />
    </Suspense>
  );
};
