import X from "@mui/icons-material/Cancel";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Grid } from "./grid";

export interface DisplayError {
	title: string;
	messages: string[];
}

interface ErrorDisplayProps {
	clearError: (val: boolean) => void;
	errorToDisplay?: DisplayError;
}

export const ErrorDisplay = (props: ErrorDisplayProps): JSX.Element => {
	const theme = useTheme();
	return (
		<Grid>
			{props.errorToDisplay ? (
				<Box
					borderColor={theme.palette.error.dark}
					bgcolor={theme.palette.error.main}
					borderRadius={theme.shape.borderRadius}
					padding={theme.spacing(1)}
				>
					<Box>
						<Typography variant="h2" fontSize="2em">
							{props.errorToDisplay.title}
						</Typography>
					</Box>
					<List>
						{props.errorToDisplay.messages.map((message) => (
							<ListItemText primary={message} key={message} />
						))}
					</List>
					<IconButton onClick={(): void => props.clearError(false)}>
						<X />
					</IconButton>
				</Box>
			) : (
				<Box />
			)}
		</Grid>
	);
};
