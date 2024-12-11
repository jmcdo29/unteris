import { useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
	ShrinkButton,
	TabbedNavigator,
	useMinWidth,
} from "@unteris/ui/components";
import { useAtom } from "jotai";
import { useState } from "react";
import { regionAtom, regionChildIndexAtom, regionChildrenAtom } from "./atoms";
import { LocationCreate } from "./location-create";
import { LocationDetail } from "./location-detail";
import { RegionChildDetail } from "./region-child-detail";

export const RegionDetail = () => {
	const theme = useTheme();
	const isWideEnough = useMinWidth();
	const [regionDetail, setRegionDetail] = useAtom(regionAtom);
	const columns = isWideEnough ? 24 : 1;
	const [shrunk, setShrunk] = useState(false);
	const halfWidth = Math.round(columns / 2);
	return (
		<Grid container columns={columns} paddingX={theme.spacing(4)}>
			<Grid
				container
				columns={1}
				xs={!shrunk ? halfWidth : 1}
				rowGap={theme.spacing(2)}
			>
				<ShrinkButton
					shrunk={shrunk}
					setShrunk={setShrunk}
					regionType={regionDetail.type}
					hide={!isWideEnough}
				/>
				<LocationDetail
					locationDetail={regionDetail}
					shrunk={shrunk}
					setDetail={setRegionDetail}
				/>
			</Grid>
			<Grid xs={!shrunk ? halfWidth : columns - 1} justifyContent="center">
				<TabbedNavigator
					orientation={shrunk ? "vertical" : "horizontal"}
					label={`Child location picker for the region ${regionDetail.name}`}
					indexAtom={regionChildIndexAtom}
					indicator="secondary"
					resourceAtom={regionChildrenAtom}
					tabPanelContent={() => <RegionChildDetail parentShrunk={shrunk} />}
					creationPanel={() => <LocationCreate parentLocation={regionDetail} />}
				/>
			</Grid>
		</Grid>
	);
};
