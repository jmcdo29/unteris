import { Deity as IDeity, Location } from '@unteris/shared/types';
import { TabsWithPanel, useFetchEffect } from '@unteris/ui/components';
import { atom, useAtom } from 'jotai';
import { SyntheticEvent } from 'react';
import { Deity } from './deity';

interface DeityPickerProps {
  location: Location;
}

const indexAtom = atom(-1);
const deitiesAtom = atom<Array<Pick<IDeity, 'id' | 'name'>>>([]);

export const DeityPicker = (props: DeityPickerProps): JSX.Element => {
  const [tabIndex, setTabIndex] = useAtom(indexAtom);
  const [deities, setDeities] = useAtom(deitiesAtom);

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
