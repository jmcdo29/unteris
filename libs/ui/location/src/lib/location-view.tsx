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
	const descripParts = locationDetail?.description
		?.split("\r\n")
		.filter((val) => !!val);
	return (
		<>
			<Grid container justifyContent="center" columns={1} xs={1}>
				<Heading fontSize={titleSize} text={locationDetail.name} />
			</Grid>
			{descripParts?.length ? (
				descripParts.map((part) => (
					<Typography paddingBottom={"0.5em"} key={part}>
						{part}
					</Typography>
				))
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
