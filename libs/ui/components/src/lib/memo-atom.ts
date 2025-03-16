import { atom, useAtom } from "jotai";
import { useMemo } from "react";

export const memoAtom = <T, K extends Array<unknown>>(
	initialValue: T,
	deps: K,
<<<<<<< HEAD
) => useAtom(useMemo(() => atom(initialValue), deps));
=======
): [Awaited<T>, (val: T) => void] =>
	useAtom(useMemo(() => atom(initialValue), [initialValue, ...deps]));
>>>>>>> 6631869 (chore: update code for biome rules)
