import type { RaceWithAbilities } from "@unteris/shared/types";

interface RaceEditorProps {
	race: RaceWithAbilities;
	setRace: (race: RaceWithAbilities) => void;
}

export const RaceEditor = (_props: RaceEditorProps): JSX.Element => {
	return <div />;
};
