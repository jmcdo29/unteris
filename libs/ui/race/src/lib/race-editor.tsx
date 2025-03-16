<<<<<<< HEAD
import type { types } from "@unteris/shared/sdk";
=======
import type { RaceWithAbilities } from "@unteris/shared/types";
>>>>>>> 6631869 (chore: update code for biome rules)

interface RaceEditorProps {
	race: types.GetRaceByIdResponseDto;
	setRace: (race: types.GetRaceByIdResponseDto) => void;
}

export const RaceEditor = (_props: RaceEditorProps): JSX.Element => <div />;
