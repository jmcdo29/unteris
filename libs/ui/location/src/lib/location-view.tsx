import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { LocationWithImage } from "@unteris/shared/types";
import { Heading, Image, Lorem } from "@unteris/ui/components";

interface LocationViewProps {
	details: LocationWithImage;
	titleSize?: string;
}

export const LocationView = ({
	titleSize = "3.75em",
	details: locationDetail,
}: LocationViewProps) => {
	return (
		<>
			<Grid container justifyContent="center" columns={1} xs={1}>
				<Heading fontSize={titleSize} text={locationDetail.name} />
			</Grid>
			{locationDetail.description ? (
				<Typography>{locationDetail.description}</Typography>
			) : (
				<Lorem />
			)}
			<Image
				src={locationDetail.imageUrl}
				alt={`The ${locationDetail.name} ${locationDetail.type}, pulled from a portion of the full Unteris map`}
			/>
		</>
	);
};
