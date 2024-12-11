import { Box, Typography } from "@mui/material";
import { LocationWithImage } from "@unteris/shared/types";
import { ObjectDetail } from "@unteris/ui/components";
import { LocationEdit } from "./location-edit";
import { LocationView } from "./location-view";

interface LocationDetailProps {
	shrunk: boolean;
	locationDetail: LocationWithImage;
	titleSize?: string;
	setDetail: (val: LocationWithImage) => void;
}

export const LocationDetail = (props: LocationDetailProps) => {
	return !props.shrunk ? (
		<ObjectDetail
			name={props.locationDetail.name}
			columns={1}
			data={props.locationDetail}
			titleSize={props.titleSize}
			objectView={LocationView}
			objectEdit={LocationEdit}
			setDetail={props.setDetail}
		/>
	) : (
		<Box />
	);
};
