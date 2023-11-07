import { FileSchema, ValibotDto } from "@unteris/server/common";
import { optional } from "valibot";

export class ImageFile extends ValibotDto(optional(FileSchema)) {}
