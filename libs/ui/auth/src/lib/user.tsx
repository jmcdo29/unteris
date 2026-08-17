import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { sdk } from "@unteris/shared/sdk";
import { userAtom } from "@unteris/ui/atoms";
import { client } from "@unteris/ui/components";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export const User = (): JSX.Element => {
	const nav = useNavigate();
	const [user, setUser] = useAtom(userAtom);
	const logout = async () => {
		await sdk.serverSecurityControllerLogout({ client });
		setUser({ id: "", email: "", displayName: "", roles: [] });
		nav("/");
	};
	return (
		<div>
			<Typography variant="h2" fontSize="2em">
				{user.displayName}
			</Typography>
			<Button onClick={logout}>Logout</Button>
		</div>
	);
};
