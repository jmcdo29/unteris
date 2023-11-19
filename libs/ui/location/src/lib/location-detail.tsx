import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Location } from "@unteris/shared/types";
import { Image, Lorem } from "@unteris/ui/components";

interface LocationDetailProps {
	shrunk: boolean;
	locationDetail: Omit<Location, "imageId"> & { imageUrl: string };
	titleSize?: string;
}

export const LocationDetail = ({
	shrunk,
	locationDetail,
	titleSize = "3.75rem",
}: LocationDetailProps) => {
	return !shrunk ? (
		<Grid container columns={1} justifyContent="center">
			<Grid container justifyContent="center" xs={1}>
				<Typography variant="h2" fontSize={titleSize}>
					{locationDetail.name}
				</Typography>
			</Grid>
			{locationDetail.description ? (
				<Box>{locationDetail.description}</Box>
			) : (
				<Lorem />
			)}
			<Box>
				<Image
					src={locationDetail.imageUrl}
					alt={`The ${locationDetail.name} ${locationDetail.type}, pulled from a portion of the full Unteris map`}
				/>
			</Box>
		</Grid>
	) : (
		<Box />
	);
};
