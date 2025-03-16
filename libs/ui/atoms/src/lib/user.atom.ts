<<<<<<< HEAD
import type { types } from "@unteris/shared/sdk";
=======
import type { RoleEnum } from "@unteris/shared/types";
>>>>>>> 6631869 (chore: update code for biome rules)
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
