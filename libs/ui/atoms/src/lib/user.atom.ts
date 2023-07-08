import { atom } from 'jotai';

export const userAtom = atom<{
  id: string;
  email: string;
  displayName: string;
}>({
  id: '',
  email: '',
  displayName: '',
});
