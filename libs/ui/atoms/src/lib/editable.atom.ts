import { atom } from "jotai";
import { userAtom } from "./user.atom";

export const editableAtom = atom((get) => {
	const user = get(userAtom);
	return !user.roles?.some((role) => ["dm", "dev", "admin"].includes(role));
});
