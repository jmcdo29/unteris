import { Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ShrinkButton, useMinWidth } from "@unteris/ui/components";
import { useAtom } from "jotai";
import { useState } from "react";
import { regionChildAtom } from "./atoms";
import { LocationDetail } from "./location-detail";

interface RegionChildDetailProps {
	parentShrunk: boolean;
}

export const RegionChildDetail = ({ parentShrunk }: RegionChildDetailProps) => {
	const [regionChild, setRegionChild] = useAtom(regionChildAtom);
	const isWideEnough = useMinWidth();
	const theme = useTheme();
	const [shrunk, setShrunk] = useState(false);
	// if (!regionChild) {
	// 	return <div />;
	// }
	const columns = parentShrunk ? (isWideEnough ? 12 : 1) : 1;
	const halfWidth = Math.round(columns / 2);
	return (
		<Grid container columns={columns} paddingX={theme.spacing(4)}>
			<Grid
				container
				columns={1}
				xs={!shrunk ? halfWidth : 1}
				rowGap={theme.spacing(2)}
			>
				{!regionChild ? (
					<Box width={"100rem"} />
				) : (
					<>
						<ShrinkButton
							shrunk={shrunk}
							setShrunk={setShrunk}
							regionType={regionChild.type}
							hide={!isWideEnough || !parentShrunk}
						/>
						<LocationDetail
							locationDetail={regionChild}
							shrunk={shrunk}
							titleSize={parentShrunk ? undefined : "2rem"}
							setDetail={setRegionChild}
						/>
					</>
				)}
			</Grid>
		</Grid>
	);
};
