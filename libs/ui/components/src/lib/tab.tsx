import { styled } from "@mui/material";
import MuiTab, { type TabProps } from "@mui/material/Tab";

export const Tab = styled(MuiTab)<TabProps>(() => ({
	alignItems: "start",
}));
