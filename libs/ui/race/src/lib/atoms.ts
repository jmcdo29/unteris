import { sdk } from "@unteris/shared/sdk";
import { client } from "@unteris/ui/components";
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

export const racesAtom = atom(async () =>
	sdk.serverRaceControllerGetAllRaces({ client }).then((res) => res.data ?? []),
);

export const raceAtom = atom(async (get) => {
	const raceId = await get(raceIdAtom);
	if (!raceId) {
		return;
	}
	const data = await sdk
		.serverRaceControllerGetRaceWithAbilities({
			client,
			path: { id: raceId },
		})
		.then((res) => res.data);
	return data;
});
