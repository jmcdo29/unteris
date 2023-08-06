import { Location, Deity } from '@unteris/shared/types';
import { sdk } from '@unteris/ui/components';
import { atom } from 'jotai';

export const editingAtom = atom(false);

export const locationsAtom = atom<Promise<Pick<Location, 'id' | 'name'>[]>>(
  async () => {
    return sdk.getLocations();
  }
);

export const locationIndexAtom = atom(0);

export const locationIdAtom = atom<Promise<string>>(async (get) => {
  const locations = await get(locationsAtom);
  const locationIndex = get(locationIndexAtom);
  if (!locations.length || locationIndex === -1) {
    return '';
  }
  return locations[locationIndex].id;
});

export const deitiesForLocaitonAtom = atom<
  Promise<Pick<Deity, 'id' | 'name'>[]>
>(async (get) => {
  const locationId = await get(locationIdAtom);
  if (!locationId) {
    return [];
  }
  return sdk.getDeitiesByLocation(locationId);
});

const lastKnownLocationIndexAtom = atom(0);

const primitiveDeityIndex = atom(0);
export const deityIndexAtom = atom(
  (get) => {
    const locationIndex = get(locationIndexAtom);
    const lastKnownLocationIndex = get(lastKnownLocationIndexAtom);
    if (locationIndex !== lastKnownLocationIndex) {
      return 0;
    }
    const val = get(primitiveDeityIndex);
    return val;
  },
  (get, set, val: number) => {
    set(lastKnownLocationIndexAtom, get(locationIndexAtom));
    set(primitiveDeityIndex, val);
  }
);

export const deityIdAtom = atom<Promise<string>>(async (get) => {
  const deities = await get(deitiesForLocaitonAtom);
  const deityIndex = get(deityIndexAtom);
  if (!deities.length || deityIndex === -1) {
    return '';
  }
  return deities[deityIndex].id;
});

export const deityAtom = atom<Promise<Deity | undefined>>(async (get) => {
  const deityId = await get(deityIdAtom);
  if (!deityId) {
    return;
  }
  return sdk.getDeityById(deityId);
});
