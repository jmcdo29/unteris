import ProfileIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Unstable_Grid2";
import { StyledButton, ThemeSwitcher } from "@unteris/ui/components";
import { atom, useAtom } from "jotai";

const menuAtom = atom(false);

export const NavBar = (): JSX.Element => {
	const [showMenu, setShowMenu] = useAtom(menuAtom);

	return (
		<>
			<Grid container={true} columns={{ xs: 4, md: 12 }}>
				<Grid md={1}>
					<Button onClick={() => setShowMenu(!showMenu)} aria-label="Menu">
						<MenuIcon />
					</Button>
				</Grid>
				<Grid md={1}>
					<StyledButton href="/" variant="h2" fontSize="2em">
						Unteris
					</StyledButton>
				</Grid>
				<Grid xs={0} md={8} />
				<ThemeSwitcher />
				<Grid md={1}>
					<Button aria-label="Profile" href="/login">
						<ProfileIcon />
					</Button>
				</Grid>
			</Grid>
			<Drawer
				open={showMenu}
				onClose={() => setShowMenu(false)}
				sx={{ alignItems: "start" }}
			>
				<StyledButton href="/" onClick={() => setShowMenu(false)}>
					Home
				</StyledButton>
				<StyledButton href="/history" onClick={() => setShowMenu(false)}>
					History
				</StyledButton>
				<StyledButton href="/deities" onClick={() => setShowMenu(false)}>
					Deities
				</StyledButton>
				<StyledButton href="/races" onClick={() => setShowMenu(false)}>
					Races
				</StyledButton>
				<StyledButton href="/location" onClick={() => setShowMenu(false)}>
					Locations
				</StyledButton>
			</Drawer>
		</>
	);
};
