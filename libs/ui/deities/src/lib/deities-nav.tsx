import { useFetchEffect, TabsWithPanel } from '@unteris/ui/components';
import { SyntheticEvent, useState } from 'react';
import { DeityPicker } from './diety-picker';

export const DeityNav = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState(0);
  const [locations, setLocations] = useState<
    Array<{ name: string; id: string }>
  >([]);

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
