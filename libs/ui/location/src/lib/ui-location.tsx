import { TabbedNavigator } from "@unteris/ui/components";
import { Suspense } from "react";
import { regionIndexAtom, regionsAtom } from "./atoms";
import { LocationCreate } from "./location-create";
import { RegionDetail } from "./region-detail";

export type UiLocationProps = Record<string, unknown>;

export function UiLocation(_props: UiLocationProps) {
	return (
		<Suspense>
			<TabbedNavigator
				label="location picker for non-plane locations"
				resourceAtom={regionsAtom}
				indexAtom={regionIndexAtom}
				tabPanelContent={() => <RegionDetail />}
				creationPanel={() => <LocationCreate />}
			/>
		</Suspense>
	);
}

export default UiLocation;
