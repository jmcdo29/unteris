import { TypeschemaDto } from "@nest-lab/typeschema";
import { PasswordResetSchema } from "@unteris/shared/types";

export class PasswordResetDto extends TypeschemaDto(PasswordResetSchema) {}
