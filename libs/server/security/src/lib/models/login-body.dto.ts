import { ZodDtoClass } from '@unteris/server/zod-pipe';
import { LoginBodySchema } from '@unteris/shared/types';

export class LoginBodyDto extends ZodDtoClass<typeof LoginBodySchema> {
	static override schema = LoginBodySchema;
}
