import { sdk, type types } from "@unteris/shared/sdk";
import { client } from "@unteris/ui/components";
import { atom } from "jotai";

export const editingAtom = atom(false);

export const regionsAtom = atom(async () => {
	return sdk
		.serverLocationControllerGetAllByType({
			client,
			query: { type: "region" },
		})
		.then((res) => res.data ?? []);
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

const regionValueAtom = atom<types.GetLocationByIdResponseDto | undefined>(
	undefined,
);

export const regionAtom = atom(
	async (get) => {
		const regionId = await get(regionIdAtom);
		const region = get(regionValueAtom);
		if (region && region.id === regionId) {
			return region;
		}
		return sdk
			.serverLocationControllerGetById({
				client,
				path: { id: regionId },
			})
			.then((res) => res.data);
	},
	(get, set, update: types.GetLocationByIdResponseDto) => {
		set(regionValueAtom, (prev) => ({ ...prev, ...update }));
	},
);

export const regionChildrenAtom = atom(async (get) => {
	const regionId = (await get(regionAtom))?.id;
	if (!regionId) {
		return [];
	}
	return sdk
		.serverLocationControllerGetAllByParentId({
			client,
			path: { id: regionId },
		})
		.then((res) => res.data ?? []);
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

const regionChildValueAtom = atom<types.GetLocationByIdResponseDto | undefined>(
	undefined,
);

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
		return sdk
			.serverLocationControllerGetById({
				client,
				path: { id: regionChildId },
			})
			.then((res) => res.data);
	},
	(get, set, update: types.GetLocationByIdResponseDto) => {
		set(regionChildValueAtom, update);
	},
);

export const newRegionAtom = atom<types.LocationCreationDto>({
	// @ts-expect-error giving incorrect string for initial state
	name: "",
	type: "region",
	description: null,
	parentId: null,
});
