import { ZodDtoClass } from '@unteris/server/zod-pipe';
import { z } from 'zod';

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
  confirmationPassword: z.string().min(12),
  name: z.string(),
});

export class SignupBody extends ZodDtoClass<typeof SignupSchema> {
  static override schema = SignupSchema;
}

export type SignupUser = z.infer<typeof SignupSchema>;
