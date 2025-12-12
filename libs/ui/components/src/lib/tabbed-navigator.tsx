import type { OverviewObject } from "@unteris/shared/types";
import { type Atom, useAtom, useAtomValue, type WritableAtom } from "jotai";
import { Suspense, type SyntheticEvent } from "react";
import { TabsWithPanel } from "./tabs-with-panel";

interface TabbedNavigatorProps {
	resourceAtom: Atom<Promise<OverviewObject[]> | OverviewObject[]>;
	indexAtom: WritableAtom<number, [val: number], void>;
	label: string;
	tabPanelContent: () => JSX.Element;
	indicator?: "primary" | "secondary";
	orientation?: "horizontal" | "vertical";
	creationPanel?: () => JSX.Element;
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
				orientation={props.orientation}
				ariaLabel={props.label}
				tabIndex={tabIndex}
				handleTabChange={handleTabChange}
				tabElements={resources}
				tabPanelContent={props.tabPanelContent}
				indicator={props.indicator}
				creationPanel={props.creationPanel}
			/>
		</Suspense>
	);
};
