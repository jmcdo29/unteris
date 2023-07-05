import { ZodDtoClass } from '@unteris/server/zod-pipe';
import { SignupSchema } from '@unteris/shared/types';

export class SignupBody extends ZodDtoClass<typeof SignupSchema> {
  static override schema = SignupSchema;
}
