import { SuccessSchema, ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

const LogoutResponseSchema = v.object({ ...SuccessSchema.entries });

export type LogoutResponse = v.InferOutput<typeof LogoutResponseSchema>;

export class LogoutResponseDto extends ValibotDto(LogoutResponseSchema) {}
