import { ValibotDto } from "@unteris/server/common";
import { PasswordResetSchema } from "@unteris/shared/types";

export class PasswordResetDto extends ValibotDto(PasswordResetSchema) {}
