import {
	type OverviewObject,
	Race,
	type RaceWithAbilities,
} from "@unteris/shared/types";
import { sdk } from "@unteris/ui/components";
import { atom } from "jotai";

export const editingAtom = atom<boolean>(false);

export const raceIndexAtom = atom(0);

export const raceIdAtom = atom<Promise<string>>(async (get) => {
	const races = await get(racesAtom);
	const raceIndex = get(raceIndexAtom);
	if (!races.length || raceIndex === -1) {
		return "";
	}
	return races[raceIndex].id;
});

export const racesAtom = atom<Promise<OverviewObject[]>>(async () => {
	return sdk.getRaces();
});

export const raceAtom = atom<Promise<RaceWithAbilities | undefined>>(
	async (get) => {
		const raceId = await get(raceIdAtom);
		if (!raceId) {
			return;
		}
		const data = await sdk.getRaceById(raceId);
		return data;
	},
);
