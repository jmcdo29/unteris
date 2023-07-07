import { Location } from '@unteris/shared/types';
import { useFetchEffect, TabsWithPanel } from '@unteris/ui/components';
import { atom, useAtom } from 'jotai';
import { SyntheticEvent } from 'react';
import { DeityPicker } from './diety-picker';

const indexAtom = atom(0);
const locationsAtom = atom<Location[]>([]);

export const DeityNav = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useAtom(indexAtom);
  const [locations, setLocations] = useAtom(locationsAtom);

  useFetchEffect({
    endpoint: 'locations',
    setter: setLocations,
    default: [],
  });

  const handleTabChange = (_event: SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <TabsWithPanel
      ariaLabel="deity location tab picker"
      tabIndex={tabIndex}
      handleTabChange={handleTabChange}
      tabElements={locations}
      tabPanelContent={(location) => {
        return <DeityPicker location={location} />;
      }}
    />
  );
};
