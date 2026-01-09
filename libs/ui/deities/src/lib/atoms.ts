import { sdk } from "@unteris/shared/sdk";
import { client } from "@unteris/ui/components";
import { atom } from "jotai";

export const editingAtom = atom(false);

export const locationsAtom = atom(async () =>
	sdk
		.serverLocationControllerGetAllByType({
			client,
			query: { type: "plane" },
		})
		.then((res) => res.data ?? []),
);

export const locationIndexAtom = atom(0);

export const locationIdAtom = atom<Promise<string>>(async (get) => {
	const locations = await get(locationsAtom);
	const locationIndex = get(locationIndexAtom);
	if (!locations.length || locationIndex === -1) {
		return "";
	}
	return locations[locationIndex].id;
});

export const deitiesForLocationAtom = atom(async (get) => {
	const locationId = await get(locationIdAtom);
	if (!locationId) {
		return [];
	}
	return sdk
		.serverDeitiesControllerGetDeitiesByLocation({
			client,
			path: { location: locationId },
		})
		.then((res) => res.data ?? []);
});

const primitiveDeityIndex = atom({ deityIndex: 0, lastKnownLocationIndex: 0 });
export const deityIndexAtom = atom(
	(get) => {
		const locationIndex = get(locationIndexAtom);
		const deityIndices = get(primitiveDeityIndex);
		if (locationIndex !== deityIndices.lastKnownLocationIndex) {
			return 0;
		}
		return deityIndices.deityIndex;
	},
	(get, set, val: number) => {
		const locationIndex = get(locationIndexAtom);
		set(primitiveDeityIndex, {
			deityIndex: val,
			lastKnownLocationIndex: locationIndex,
		});
	},
);

export const deityIdAtom = atom<Promise<string>>(async (get) => {
	const deities = await get(deitiesForLocationAtom);
	const deityIndex = get(deityIndexAtom);
	if (!deities.length || deityIndex === -1) {
		return "";
	}
	return deities[deityIndex].id;
});

export const deityAtom = atom(async (get) => {
	const deityId = await get(deityIdAtom);
	if (!deityId) {
		return;
	}
	return sdk
		.serverDeitiesControllerGetDeityById({
			client,
			path: { id: deityId },
		})
		.then((res) => res.data);
});
