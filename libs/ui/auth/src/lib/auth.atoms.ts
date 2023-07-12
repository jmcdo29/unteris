import { DisplayError } from '@unteris/ui/components';
import { atom } from 'jotai';

export const isLoggingInAtom = atom(true);
export const displayErrorAtom = atom(false);
export const authErrorAtom = atom<DisplayError | undefined>(undefined);
