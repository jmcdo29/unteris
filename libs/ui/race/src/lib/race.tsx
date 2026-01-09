import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { useAtomValue } from "jotai";

import { Suspense } from "react";
import { editingAtom, raceAtom } from "./atoms";
import { RaceEditor } from "./race-editor";
import { RaceViewer } from "./race-viewer";

export const Race = (): JSX.Element => {
	const isWideEnough = useMediaQuery("(min-width:600px)");
	const race = useAtomValue(raceAtom);
	const isEditing = useAtomValue(editingAtom);

	const updateRace = (_race: unknown) => {
		/* this is where I'll call back to the server to save */
	};

	if (!race) {
		return <div />;
	}

	return (
		<Suspense>
			<Box padding={`${!isWideEnough ? "1em" : "0"} 1em`}>
				{isEditing ? (
					<RaceEditor race={race} setRace={updateRace} />
				) : (
					<RaceViewer race={race} />
				)}
			</Box>
		</Suspense>
	);
};
