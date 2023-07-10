import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodDtoClass } from './zod-dto.interface';

@Injectable()
export class ZodValidationPipe {
  transform(value: Record<string, unknown>, metadata: ArgumentMetadata) {
    const schemaClass: typeof ZodDtoClass =
      metadata.metatype! as unknown as typeof ZodDtoClass;
    const result = schemaClass.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(
        result.error.errors.map((err) => {
          const path = err.path[0];
          const mappedErr = {
            path,
            message: '',
          };
          switch (err.code) {
            case 'invalid_string':
              if (err.validation === 'email') {
                mappedErr.message = `${path} is not a valid email`;
              }
              mappedErr.message = `${path} is an invalid string`;
              break;
            case 'too_small':
              mappedErr.message = `${path} should be at least ${err.minimum} characters`;
              break;
            default:
              mappedErr.message = 'Hey dev! Add this case:\n' + err.message;
          }
          return mappedErr;
        })
      );
    }
    return { data: result.data };
  }
}
