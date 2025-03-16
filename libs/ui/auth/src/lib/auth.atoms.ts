<<<<<<< HEAD
import type { types } from "@unteris/shared/sdk";
=======
import type { SignupUser } from "@unteris/shared/types";
>>>>>>> 6631869 (chore: update code for biome rules)
import type { DisplayError } from "@unteris/ui/components";
import { atom } from "jotai";

export const isLoggingInAtom = atom(true);
export const displayErrorAtom = atom(false);
export const authErrorAtom = atom<DisplayError | undefined>(undefined);
export const forgotPasswordAtom = atom(false);
export const authUserAtom = atom<types.SignupBodyDto>({
	email: "",
	password: "",
	name: "",
});
