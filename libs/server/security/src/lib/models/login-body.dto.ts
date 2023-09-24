import { TypeschemaDto } from '@nest-lab/typeschema';
import { LoginBodySchema } from '@unteris/shared/types';

export class LoginBodyDto extends TypeschemaDto(LoginBodySchema) {}
