import { Location, Deity } from '@unteris/shared/types';
import { sdk } from '@unteris/ui/components';
import { atom } from 'jotai';

export const editingAtom = atom(false);

export const locationsAtom = atom<Promise<Pick<Location, 'id' | 'name'>[]>>(
  async () => {
    return sdk.getLocations();
  }
);

export const locationIdAtom = atom<string>('');

export const deitiesForLocaitonAtom = atom<
  Promise<Pick<Deity, 'id' | 'name'>[]>
>(async (get) => {
  const locationId = get(locationIdAtom);
  if (!locationId) {
    return [];
  }
  return sdk.getDeitiesByLocation(locationId);
});

export const deityIdAtom = atom<string>('');

export const deityAtom = atom<Promise<Deity | undefined>>(async (get) => {
  const deityId = get(deityIdAtom);
  if (!deityId) {
    return;
  }
  return sdk.getDeityById(deityId);
});
