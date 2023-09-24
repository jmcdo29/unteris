import { TypeschemaDto } from "@nest-lab/typeschema";
import { SignupSchema } from "@unteris/shared/types";

export class SignupBody extends TypeschemaDto(SignupSchema) {}
