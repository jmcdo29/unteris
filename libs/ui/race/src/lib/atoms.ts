import { Race, RaceWithAbilities } from '@unteris/shared/types';
import { sdk } from '@unteris/ui/components';
import { atom } from 'jotai';

export const editingAtom = atom<boolean>(false);

export const raceIdAtom = atom<string>('');

export const racesAtom = atom<Promise<Pick<Race, 'id' | 'name'>[]>>(
  async () => {
    return sdk.getRaces();
  }
);

export const raceAtom = atom<Promise<RaceWithAbilities | undefined>>(
  async (get) => {
    const raceId = get(raceIdAtom);
    if (!raceId) {
      return;
    }
    const data = await sdk.getRaceById(get(raceIdAtom).toString());
    console.log(data);
    return data;
  }
);
