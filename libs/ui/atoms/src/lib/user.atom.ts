import type { types } from "@unteris/shared/sdk";
import { atom } from "jotai";

export const userAtom = atom<{
	id: string;
	email: string;
	displayName: string;
	roles: types.GetMeResponseDto["roles"];
}>({
	id: "",
	email: "",
	displayName: "",
	roles: [],
});
