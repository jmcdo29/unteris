import { styled } from "@mui/material";
import MuiTab, { TabProps } from "@mui/material/Tab";

export const Tab = styled(MuiTab)<TabProps>(() => {
	return {
		alignItems: "start",
	};
});
