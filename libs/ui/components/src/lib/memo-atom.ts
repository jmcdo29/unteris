import { atom, useAtom } from "jotai";
import { useMemo } from "react";

export const memoAtom = <T, K extends Array<unknown>>(
	initialValue: T,
	deps: K,
	// biome-ignore lint/nursery/useExhaustiveDependencies: deps come from the memoAtom function
	// biome-ignore lint/nursery/useHookAtTopLevel: hook wrapper will only be used inside a render function
) => useAtom(useMemo(() => atom(initialValue), deps));
