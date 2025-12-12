import PlusIcon from "@mui/icons-material/AddCircle";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Unstable_Grid2";
import type { OverviewObject } from "@unteris/shared/types";
import { editableAtom } from "@unteris/ui/atoms";
import { useAtomValue } from "jotai";
import { Suspense, type SyntheticEvent } from "react";
import { a11yProps } from "./a11y.props";
import { Tab } from "./tab";
import { TabPanel } from "./tab-panel";
import { useMinWidth } from "./use-min-width";

interface TabsWithPanelProps {
	ariaLabel: string;
	tabIndex: number;
	handleTabChange: (_event: SyntheticEvent, newIndex: number) => void;
	tabElements: OverviewObject[];
	tabPanelContent: (prop: unknown) => JSX.Element;
	indicator?: "primary" | "secondary";
	orientation?: "horizontal" | "vertical";
	creationPanel?: () => JSX.Element;
}

export const TabsWithPanel = (props: TabsWithPanelProps): JSX.Element => {
	const isWideEnough = useMinWidth();
	const horizontalTabs = props.orientation === "horizontal" || !isWideEnough;
	const indicator = props.indicator ?? "primary";
	const growAndShrink = !horizontalTabs ? 0 : 1;
	const canEdit = useAtomValue(editableAtom);
	const tabs = props.tabElements.map((tab, index) => (
		<Tab {...a11yProps(index)} label={tab.name} key={tab.id} />
	));
	const tabPanels = props.tabElements.map((tab, index) => (
		<TabPanel value={props.tabIndex} index={index} key={tab.id}>
			<Suspense>{props.tabPanelContent(tab)}</Suspense>
		</TabPanel>
	));
	if (canEdit) {
		tabs.push(
			<Tab {...a11yProps(props.tabElements.length)} icon={<PlusIcon />} />,
		);
		tabPanels.push(
			<TabPanel value={props.tabIndex} index={props.tabElements.length}>
				<Suspense>{props.creationPanel?.()}</Suspense>
			</TabPanel>,
		);
	}
	return (
		<Grid
			container={true}
			wrap={!horizontalTabs ? "nowrap" : "wrap"}
			columns={horizontalTabs ? 1 : 12}
		>
			<Tabs
				orientation={horizontalTabs ? "horizontal" : "vertical"}
				value={props.tabIndex}
				onChange={props.handleTabChange}
				aria-label={props.ariaLabel}
				indicatorColor={indicator}
				textColor={indicator}
				variant={!horizontalTabs ? "standard" : "scrollable"}
				sx={{
					borderRight: 1,
					borderColor: "divider",
					alignItems: !horizontalTabs ? "start" : "center",
					overflow: !horizontalTabs ? "unset" : "hidden",
					flexGrow: growAndShrink,
					flexShrink: growAndShrink,
				}}
			>
				{...tabs}
			</Tabs>
			{...tabPanels}
		</Grid>
	);
};
