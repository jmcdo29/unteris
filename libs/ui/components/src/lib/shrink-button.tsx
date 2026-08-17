import Left from "@mui/icons-material/Visibility";
import Right from "@mui/icons-material/VisibilityOff";
import { Box, Button, Unstable_Grid2 as Grid } from "@mui/material";

interface ShrinkButtonProps {
	hide: boolean;
	shrunk: boolean;
	setShrunk: (val: boolean) => void;
	regionType: string;
}

export const ShrinkButton = ({
	hide,
	shrunk,
	setShrunk,
	regionType,
}: ShrinkButtonProps): JSX.Element => {
	const label = !shrunk
		? `Shrink the ${regionType} tab`
		: `Expand the ${regionType} tab`;
	return (
		<Grid xs={1} display={!hide ? "inherit" : "none"}>
			<Box>
				<Button
					aria-label={label}
					title={label}
					onClick={(): void => setShrunk(!shrunk)}
				>
					{shrunk ? <Right /> : <Left />}
				</Button>
			</Box>
		</Grid>
	);
};
