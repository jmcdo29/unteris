import { Location, OverviewObject } from "@unteris/shared/types";
import { sdk } from "@unteris/ui/components";
import { atom } from "jotai";

export const editingAtom = atom(false);

export const regionsAtom = atom<Promise<OverviewObject[]>>(async () => {
	return sdk.getLocationsByType("region");
});

export const regionIndexAtom = atom(0);

export const regionIdAtom = atom<Promise<string>>(async (get) => {
	const regions = await get(regionsAtom);
	const regionIndex = get(regionIndexAtom);
	if (!regions.length || regionIndex === -1) {
		return "";
	}
	return regions[regionIndex].id;
});

export const regionAtom = atom<
	Promise<(Omit<Location, "imageId"> & { imageUrl: string }) | undefined>
>(async (get) => {
	const regionId = await get(regionIdAtom);
	if (!regionId) {
		return;
	}
	return sdk.getLocationById(regionId);
});

export const regionChildrenAtom = atom<Promise<OverviewObject[]>>(
	async (get) => {
		const regionId = (await get(regionAtom))?.id;
		if (!regionId) {
			return [];
		}
		return sdk.getLocationByParentId(regionId);
	},
);

export const regionChildIndexAtom = atom(0);

export const regionChildIdAtom = atom<Promise<string>>(async (get) => {
	const regionChildren = await get(regionChildrenAtom);
	const regionChildIndex = get(regionChildIndexAtom);
	if (!regionChildren.length || regionChildIndex === -1) {
		return "";
	}
	return regionChildren[regionChildIndex].id;
});

export const regionChildAtom = atom<
	Promise<(Omit<Location, "imageId"> & { imageUrl: string }) | undefined>
>(async (get) => {
	const regionChildId = await get(regionChildIdAtom);
	if (!regionChildId) {
		return undefined;
	}
	return sdk.getLocationById(regionChildId);
});
