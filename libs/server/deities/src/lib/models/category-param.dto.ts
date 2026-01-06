import { ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

const CategoryParamSchema = v.object({
	category: v.pipe(v.string(), v.ulid()),
});

export class CategoryParamDto extends ValibotDto(CategoryParamSchema) {}
