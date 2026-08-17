import Typography from "@mui/material/Typography";

interface HeadingProps {
	fontSize?: string;
	text: string;
}

export const Heading = (props: HeadingProps): JSX.Element => {
	return (
		<Typography variant="h2" fontSize={props.fontSize ?? "2em"}>
			{props.text}
		</Typography>
	);
};
