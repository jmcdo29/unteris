import { Controller, Get, Param, Query } from "@nestjs/common";
import { SkipSessionCheck } from "@unteris/server/session";
import { ByTypeQueryDto } from "./models/by-type-query.dto";
import { IdParamDto } from "./models/id-param.dto";
import { ServerLocationService } from "./server-location.service";

@Controller("locations")
@SkipSessionCheck()
export class ServerLocationController {
	constructor(private readonly service: ServerLocationService) {}
	@Get()
	getAllByType(@Query() query: ByTypeQueryDto) {
		return this.service.getByType(query.data.type);
	}

	@Get("/by-parent/:id")
	getAllByParentId(@Param() params: IdParamDto) {
		return this.service.getByParentId(params.data.id);
	}
}
