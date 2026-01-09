import type { types } from "@unteris/shared/sdk";

interface RaceEditorProps {
	race: types.GetRaceByIdResponseDto;
	setRace: (race: types.GetRaceByIdResponseDto) => void;
}

export const RaceEditor = (_props: RaceEditorProps): JSX.Element => <div />;
