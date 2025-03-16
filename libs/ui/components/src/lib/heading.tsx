import Typography from "@mui/material/Typography";

interface HeadingProps {
	fontSize?: string;
	text: string;
}

<<<<<<< HEAD
export const Heading = (props: HeadingProps) => (
	<Typography variant="h2" fontSize={props.fontSize ?? "2em"}>
		{props.text}
	</Typography>
);
=======
export const Heading = (props: HeadingProps): JSX.Element => {
	return (
		<Typography variant="h2" fontSize={props.fontSize ?? "2em"}>
			{props.text}
		</Typography>
	);
};
>>>>>>> 6631869 (chore: update code for biome rules)
