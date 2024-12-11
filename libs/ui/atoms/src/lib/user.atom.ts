import { RoleEnum } from "@unteris/shared/types";
import { atom } from "jotai";

export const userAtom = atom<{
	id: string;
	email: string;
	displayName: string;
	roles: RoleEnum[];
}>({
	id: "",
	email: "",
	displayName: "",
	roles: [],
});
