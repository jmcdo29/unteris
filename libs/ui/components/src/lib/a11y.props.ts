export const a11yProps = (
	index: number,
): { id: string; "aria-controls": string } => {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
};
