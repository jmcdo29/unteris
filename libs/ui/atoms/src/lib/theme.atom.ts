import { atomWithStorage } from "jotai/utils";

export const themeAtom = atomWithStorage<"dark" | "light">("theme", "dark");
