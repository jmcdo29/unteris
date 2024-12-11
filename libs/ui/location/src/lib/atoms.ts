import { LocationCreation, LocationWithImage } from "@unteris/shared/types";
import { sdk } from "@unteris/ui/components";
import { atom } from "jotai";

export const editingAtom = atom(false);

export const regionsAtom = atom(async () => {
	return sdk.getLocationsByType("region");
});

export const regionIndexAtom = atom(0);

export const regionIdAtom = atom(async (get) => {
	const regions = await get(regionsAtom);
	const regionIndex = get(regionIndexAtom);
	if (!regions.length || regionIndex === -1) {
		return "";
	}
	return regions[regionIndex].id;
});

const regionValueAtom = atom<LocationWithImage | undefined>(undefined);

export const regionAtom = atom(
	async (get) => {
		const regionId = await get(regionIdAtom);
		const region = get(regionValueAtom);
		if (region && region.id === regionId) {
			return region;
		}
		return sdk.getLocationById(regionId);
	},
	(get, set, update: LocationWithImage) => {
		set(regionValueAtom, (prev) => ({ ...prev, ...update }));
	},
);

export const regionChildrenAtom = atom(async (get) => {
	const regionId = (await get(regionAtom))?.id;
	if (!regionId) {
		return [];
	}
	return sdk.getLocationByParentId(regionId);
});

export const regionChildIndexAtom = atom(0);

export const regionChildIdAtom = atom(async (get) => {
	const regionChildren = await get(regionChildrenAtom);
	const regionChildIndex = get(regionChildIndexAtom);
	if (!regionChildren.length || regionChildIndex === -1) {
		return "";
	}
	return regionChildren[regionChildIndex].id;
});

const regionChildValueAtom = atom<LocationWithImage | undefined>(undefined);

export const regionChildAtom = atom(
	async (get) => {
		const regionChildId = await get(regionChildIdAtom);
		const regionChild = get(regionChildValueAtom);
		if (!regionChildId) {
			return undefined;
		}
		if (regionChild && regionChild.id === regionChildId) {
			return regionChild;
		}
		return sdk.getLocationById(regionChildId);
	},
	(get, set, update: LocationWithImage) => {
		set(regionChildValueAtom, update);
	},
);

export const newRegionAtom = atom<LocationCreation>({
	// @ts-expect-error giving incorrect string for initial state
	name: "",
	type: "region",
	description: null,
	parentId: null,
});
