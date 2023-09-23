import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactNode } from "react";

interface TabPanelProps {
	children?: ReactNode;
	index: number;
	value: number;
	gridColumn?: string | number;
}

export const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;
	return (
		<Grid container={true}>
			<Grid>
				<Box
					role="tabpanel"
					hidden={value !== index}
					id={`vertical-tabpanel-${index}`}
					aria-labelledby={`vertical-tab-${index}`}
					{...other}
				>
					{value === index && <Box>{children}</Box>}
				</Box>
			</Grid>
		</Grid>
	);
};
