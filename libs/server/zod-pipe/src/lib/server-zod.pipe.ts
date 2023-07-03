import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ZodValidationPipe {
  transform(value: Record<string, unknown>, metadata: ArgumentMetadata) {
    const schemaClass: { schema: z.ZodSchema } =
      metadata.metatype! as unknown as { schema: z.ZodSchema };
    const result = schemaClass.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(result.error);
    }
    return result.data;
  }
}
