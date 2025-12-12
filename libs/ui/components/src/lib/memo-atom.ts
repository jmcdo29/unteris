import { atom, useAtom } from "jotai";
import { useMemo } from "react";

export const memoAtom = <T, K extends Array<unknown>>(
	initialValue: T,
	deps: K,
) => useAtom(useMemo(() => atom(initialValue), deps));
