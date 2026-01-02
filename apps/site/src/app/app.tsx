import CssBaseline from "@mui/material/CssBaseline";
import type { LinkProps } from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeAtom, userAtom } from "@unteris/ui/atoms";
import { sdk } from "@unteris/ui/components";
import { useAtom } from "jotai";
import { forwardRef, useEffect, useMemo } from "react";
import {
	Link as RouterLink,
	type LinkProps as RouterLinkProps,
	RouterProvider,
} from "react-router-dom";
import { router } from "./router";

export const App = () => {
	const [chosenTheme] = useAtom(themeAtom);
	const [user, setUser] = useAtom(userAtom);
	const LinkBehavior = forwardRef<
		HTMLAnchorElement,
		Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
	>((props, ref) => {
		const { href, ...other } = props;
		// Map href (MUI) -> to (react-router)
		return <RouterLink ref={ref} to={href} {...other} />;
	});
	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: chosenTheme,
					primary: {
						main: "#63ad58",
					},
					secondary: {
						main: "#a337bc",
					},
					error: {
						main: "#e58093",
					},
				},
				typography: {
					h2: {
						fontFamily: "Cinzel Decorative",
					},
					body2: {
						fontFamily: "Cinzel Decorative",
					},
				},
				components: {
					MuiLink: {
						defaultProps: {
							component: LinkBehavior,
						} as LinkProps,
					},
					MuiButtonBase: {
						defaultProps: {
							LinkComponent: LinkBehavior,
						},
					},
				},
			}),
		[chosenTheme, LinkBehavior],
	);
	useEffect(() => {
		if (!user.id && sessionStorage.getItem("sessionId")) {
			const signIn = async () => {
				const res = await sdk.getUser();
				setUser({
					id: res.id,
					email: res.email,
					displayName: res.name,
					roles: [],
				});
			};
			signIn();
		}
	}, [user, setUser]);
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<RouterProvider router={router()} />
		</ThemeProvider>
	);
};
