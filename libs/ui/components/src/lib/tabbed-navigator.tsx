import {
  atom,
  Atom,
  PrimitiveAtom,
  useAtom,
  useAtomValue,
  useSetAtom,
} from 'jotai';
import { Suspense, SyntheticEvent } from 'react';
import { TabsWithPanel } from './tabs-with-panel';

interface TabbedNavigatorProps {
  resourceAtom: Atom<Promise<any[]> | any[]>;
  idAtom: PrimitiveAtom<string>;
  indexAtom: PrimitiveAtom<number>;
  label: string;
  tabPanelContent: () => JSX.Element;
  indicator?: 'primary' | 'secondary';
}

export const TabbedNavigator = (props: TabbedNavigatorProps) => {
  const [tabIndex, setTabIndex] = useAtom(props.indexAtom);
  const resources = useAtomValue(props.resourceAtom);
  const setId = useSetAtom(props.idAtom);

  const handleTabChange = (_event: SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
    setId(resources[newIndex].id);
  };

  return (
    <Suspense>
      <TabsWithPanel
        ariaLabel={props.label}
        tabIndex={tabIndex}
        handleTabChange={handleTabChange}
        tabElements={resources}
        tabPanelContent={props.tabPanelContent}
        indicator={props.indicator}
      />
    </Suspense>
  );
};
