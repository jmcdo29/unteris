import { TabbedNavigator } from "@unteris/ui/components";
import { Suspense } from "react";
import { raceIndexAtom, racesAtom } from "./atoms";

import { Race } from "./race";

export const UiRace = (): JSX.Element => {
	return (
		<Suspense>
			<TabbedNavigator
				label="homebrew race tab picker"
				resourceAtom={racesAtom}
				tabPanelContent={() => <Race />}
				indexAtom={raceIndexAtom}
			/>
		</Suspense>
	);
};
