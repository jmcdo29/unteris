import { TabbedNavigator } from "@unteris/ui/components";
import { Suspense } from "react";
import { deitiesForLocationAtom, deityIndexAtom } from "./atoms";
import { Deity } from "./deity";

export const DeityPicker = (): JSX.Element => {
	return (
		<Suspense>
			<TabbedNavigator
				label="homebrew deity tab picker"
				resourceAtom={deitiesForLocationAtom}
				indexAtom={deityIndexAtom}
				tabPanelContent={() => <Deity />}
				indicator="secondary"
			/>
		</Suspense>
	);
};
