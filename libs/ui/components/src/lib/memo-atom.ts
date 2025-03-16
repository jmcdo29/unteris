import { atom, useAtom } from "jotai";
import { useMemo } from "react";

export const memoAtom = <T, K extends Array<unknown>>(
	initialValue: T,
	deps: K,
): [Awaited<T>, (val: T) => void] =>
	useAtom(useMemo(() => atom(initialValue), [initialValue, ...deps]));
