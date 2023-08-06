import { Atom, useAtom, useAtomValue, WritableAtom } from 'jotai';
import { Suspense, SyntheticEvent } from 'react';
import { TabsWithPanel } from './tabs-with-panel';

interface TabbedNavigatorProps {
  resourceAtom: Atom<Promise<any[]> | any[]>;
  indexAtom: WritableAtom<number, [val: number], void>;
  label: string;
  tabPanelContent: () => JSX.Element;
  indicator?: 'primary' | 'secondary';
}

export const TabbedNavigator = (props: TabbedNavigatorProps) => {
  const [tabIndex, setTabIndex] = useAtom(props.indexAtom);
  const resources = useAtomValue(props.resourceAtom);

  const handleTabChange = (_event: SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
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
