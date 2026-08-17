import { Box } from "@mui/material";
import { type types } from "@unteris/shared/sdk";
import { ObjectDetail } from "@unteris/ui/components";
import { LocationEdit } from "./location-edit";
import { LocationView } from "./location-view";

interface LocationDetailProps {
	shrunk: boolean;
	locationDetail: types.GetLocationByIdResponseDto;
	titleSize?: string;
	setDetail: (val: types.GetLocationByIdResponseDto) => void;
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
		<Box sx={{ width: "100rem" }} />
	);
};
