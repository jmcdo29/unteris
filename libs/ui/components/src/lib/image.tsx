import Box from "@mui/material/Box";

interface ImageProps {
	src?: string | null;
	alt: string;
	style?: Record<string, string>;
}

export const Image = (props: ImageProps): JSX.Element => {
	const imgSrc = props.src ?? undefined;
	return (
		<Box>
			<a href={imgSrc} target="_blank" rel="noreferrer">
				<img
					src={imgSrc}
					alt={props.alt}
					style={{
						width: "100%",
						height: "100%",
						maxHeight: "600px",
						objectFit: "contain",
						padding: "0 1em",
						...(props.style ?? {}),
					}}
				/>
			</a>
		</Box>
	);
};
