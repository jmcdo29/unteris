import { ValibotDto } from "@unteris/server/common";
import { SignupSchema } from "@unteris/shared/types";

export class SignupBodyDto extends ValibotDto(SignupSchema) {}
