import CssBaseline from "@mui/material/CssBaseline";
import { LinkProps } from "@mui/material/Link";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { themeAtom } from "@unteris/ui/atoms";
import { useAtom } from "jotai";
import { forwardRef, useMemo } from "react";
import {
	Link as RouterLink,
	LinkProps as RouterLinkProps,
	RouterProvider,
} from "react-router-dom";

import { sdk } from "@unteris/ui/components";
import { router } from "./router";

export const App = () => {
	const [chosenTheme] = useAtom(themeAtom);
	sdk.getCsrfToken().then((data) => sdk.setCsrfToken(data.csrfToken));
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
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<RouterProvider router={router()} />
		</ThemeProvider>
	);
};
