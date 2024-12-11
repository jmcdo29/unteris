import Heart from "@mui/icons-material/Favorite";
import { Box, Divider, useTheme } from "@mui/material";
import { Grid, StyledLink } from "@unteris/ui/components";

export const Footer = (): JSX.Element => {
	const theme = useTheme();
	const color = theme.palette.mode === "dark" ? "primary" : "secondary";
	return (
		<Box
			sx={{
				backgroundColor: theme.palette.background.paper,
			}}
		>
			<Divider />
			<Grid
				columns={1}
				sx={{ justifyContent: "center", justifyItems: "center" }}
			>
				<div>
					Made with <Heart color={color} display="inline-block" /> by&nbsp;
					<StyledLink
						href="https://github.com/jmcdo29"
						display="inline"
						color={color}
					>
						Jackie McDoniel
					</StyledLink>
				</div>
			</Grid>
		</Box>
	);
};
