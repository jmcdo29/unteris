import { useTheme } from "@mui/material";
import { userAtom } from "@unteris/ui/atoms";
import { Grid } from "@unteris/ui/components";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginOrRegister } from "./login-or-register";

export function UiAuth() {
	const theme = useTheme();
	const user = useAtomValue(userAtom);
	const nav = useNavigate();
	useEffect(() => {
		if (user.id) {
			nav("/me");
			return;
		}
	}, [user, nav]);
	return (
		<Grid columns={1} sx={{ justifyItems: "center", rowGap: theme.spacing(2) }}>
			<LoginOrRegister />
		</Grid>
	);
}

export default UiAuth;
