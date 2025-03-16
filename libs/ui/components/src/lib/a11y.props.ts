<<<<<<< HEAD
export const a11yProps = (index: number) => ({
	id: `vertical-tab-${index}`,
	"aria-controls": `vertical-tabpanel-${index}`,
});
=======
export const a11yProps = (
	index: number,
): { id: string; "aria-controls": string } => {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
};
>>>>>>> 6631869 (chore: update code for biome rules)
