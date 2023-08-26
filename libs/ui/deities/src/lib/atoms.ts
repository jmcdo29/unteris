import { Location, Deity } from '@unteris/shared/types';
import { sdk } from '@unteris/ui/components';
import { atom } from 'jotai';

export const editingAtom = atom(false);

export const locationsAtom = atom<Promise<Pick<Location, 'id' | 'name'>[]>>(
  async () => {
    return sdk.getLocationsByType('plane');
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

const primitiveDeityIndex = atom({ deityIndex: 0, lastKnownLocationIndex: 0 });
export const deityIndexAtom = atom(
  (get) => {
    const locationIndex = get(locationIndexAtom);
    const deityIndicies = get(primitiveDeityIndex);
    if (locationIndex !== deityIndicies.lastKnownLocationIndex) {
      return 0;
    }
    return deityIndicies.deityIndex;
  },
  (get, set, val: number) => {
    const locationIndex = get(locationIndexAtom);
    set(primitiveDeityIndex, {
      deityIndex: val,
      lastKnownLocationIndex: locationIndex,
    });
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

export const deityAtom = atom<
  Promise<(Omit<Deity, 'imageId'> & { imageUrl: string }) | undefined>
>(async (get) => {
  const deityId = await get(deityIdAtom);
  if (!deityId) {
    return;
  }
  return sdk.getDeityById(deityId);
});
