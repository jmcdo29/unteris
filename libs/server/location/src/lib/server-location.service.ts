import { Injectable } from '@nestjs/common';
import { Location } from '@unteris/shared/types';
import { Insertable } from 'kysely';
import { LocationRepository } from './location.repository';

@Injectable()
export class ServerLocationService {
  constructor(private readonly locationRepo: LocationRepository) {}

  async getLocationsByType(
    type: Location['type']
  ): Promise<Pick<Location, 'id' | 'name'>[]> {
    return this.locationRepo.getLocationsByType(type);
  }

  async createLocation(location: Insertable<Location>): Promise<Location> {
    const result = this.locationRepo.createLocation(location);
    return result;
  }
}
