import { FileSchema, ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

export class ImageFile extends ValibotDto(v.optional(FileSchema)) {}
