import { ZodDtoClass } from '@unteris/server/zod-pipe';
import { PasswordResetRequestSchema } from '@unteris/shared/types';

export class PasswordResetRequestDto extends ZodDtoClass<
  typeof PasswordResetRequestSchema
> {
  static override schema = PasswordResetRequestSchema;
}
