import { TabbedNavigator } from "@unteris/ui/components";
import { Suspense } from "react";
import { locationIndexAtom, locationsAtom } from "./atoms";
import { DeityPicker } from "./deity-picker";

export const DeityNav = (): JSX.Element => {
	return (
		<Suspense>
			<TabbedNavigator
				label="homebrew deity location tab picker"
				resourceAtom={locationsAtom}
				indexAtom={locationIndexAtom}
				tabPanelContent={() => <DeityPicker />}
			/>
		</Suspense>
	);
};
