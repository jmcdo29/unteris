import { ValibotDto } from "@unteris/server/common";
import { LoginBodySchema } from "@unteris/shared/types";

export class LoginBodyDto extends ValibotDto(LoginBodySchema) {}
