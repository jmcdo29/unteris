import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { OverviewObjectDto } from "@unteris/server/common";
import { SkipSessionCheck } from "@unteris/server/session";
import { locationRoute } from "@unteris/shared/types";
import { ByTypeQueryDto } from "./models/by-type-query.dto";
import { IdParamDto } from "./models/id-param.dto";
import { ServerLocationService } from "./server-location.service";

@Controller(locationRoute)
@SkipSessionCheck()
export class ServerLocationController {
	constructor(private readonly service: ServerLocationService) {}
	@ApiOkResponse({ type: [OverviewObjectDto] })
	@Get()
	getAllByType(@Query() query: ByTypeQueryDto) {
		return this.service.getByType(query.data.type);
	}

	@ApiOkResponse({ type: [OverviewObjectDto] })
	@Get("/by-parent/:id")
	getAllByParentId(@Param() params: IdParamDto) {
		return this.service.getByParentId(params.data.id);
	}

	@Get("/id/:id")
	getById(@Param() param: IdParamDto) {
		return this.service.getById(param.data.id);
	}
}
