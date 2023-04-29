import { TabsWithPanel, useFetchEffect } from '@unteris/ui/components';
import { SyntheticEvent, useState } from 'react';
import { Deity } from './deity';

interface DeityPickerProps {
  location: { name: string; id: string };
}

export const DeityPicker = (props: DeityPickerProps): JSX.Element => {
  const [tabIndex, setTabIndex] = useState(-1);
  const [deities, setDeities] = useState<Array<{ name: string; id: string }>>(
    []
  );

  const handleTabChange = (_event: SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  useFetchEffect({
    endpoint: `deities/location/${props.location.id}`,
    setter: setDeities,
    default: [],
  });

  return (
    <TabsWithPanel
      ariaLabel="deity tab picker"
      tabIndex={tabIndex}
      handleTabChange={handleTabChange}
      tabElements={deities}
      tabPanelContent={(deity) => {
        return <Deity deity={deity} />;
      }}
      indicator="secondary"
    />
  );
};
