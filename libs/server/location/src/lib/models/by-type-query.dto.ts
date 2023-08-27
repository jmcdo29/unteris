import { LocationByTypeQuerySchema } from '@unteris/shared/types';
import { ZodDtoClass } from '@unteris/server/zod-pipe';

export class ByTypeQueryDto extends ZodDtoClass<
  typeof LocationByTypeQuerySchema
> {
  static schema = LocationByTypeQuerySchema;
}
