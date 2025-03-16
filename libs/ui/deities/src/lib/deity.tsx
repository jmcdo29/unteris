import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
<<<<<<< HEAD
import type { types } from "@unteris/shared/sdk";
=======
import type { Deity as IDeity } from "@unteris/shared/types";
>>>>>>> 6631869 (chore: update code for biome rules)
import { useAtomValue } from "jotai";
import { Suspense } from "react";
import { deityAtom, editingAtom } from "./atoms";
import { DeityEditor } from "./deity-editor";
import { DeityViewer } from "./deity-viewer";

export const Deity = (): JSX.Element => {
	const isWideEnough = useMediaQuery("(min-width:600px)");
	const deity = useAtomValue(deityAtom);
	const isEditing = useAtomValue(editingAtom);

	const updateDeity = (_deity: types.GetDeityByIdResponseDto) => {
		/* this is where I'll call back to the server to save */
	};

	if (!deity) {
		return <div />;
	}

	return (
		<Suspense>
			<Box padding={`${!isWideEnough ? "1em" : "0"} 1em`}>
				{isEditing ? (
					<DeityEditor deity={deity} setDeity={updateDeity} />
				) : (
					<DeityViewer deity={deity} />
				)}
			</Box>
		</Suspense>
	);
};
