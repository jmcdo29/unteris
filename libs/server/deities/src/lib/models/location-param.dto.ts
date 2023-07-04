import { ZodDtoClass } from '@unteris/server/zod-pipe';
import { LocationParamSchema } from '@unteris/shared/types';

export class LocationParamDto extends ZodDtoClass<typeof LocationParamSchema> {
  static override schema = LocationParamSchema;
}
