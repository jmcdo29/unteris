import { ZodDtoClass } from '@unteris/server/zod-pipe';
import { z } from 'zod';

const LoginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
});

export class LoginBodyDto extends ZodDtoClass<typeof LoginBodySchema> {
  static override schema: z.ZodType<any, z.ZodTypeDef, any> = LoginBodySchema;
}

export type LoginBody = z.infer<typeof LoginBodySchema>;
