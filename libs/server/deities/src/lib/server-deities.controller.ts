import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { OverviewObjectDto } from "@unteris/server/common";
import { IdParamDto } from "@unteris/server/common";
import { SkipSessionCheck } from "@unteris/server/session";
import { deitiesRoute } from "@unteris/shared/types";
import { CategoryParamDto } from "./models/category-param.dto";
import { LocationParamDto } from "./models/location-param.dto";
import { ServerDeitiesService } from "./server-deities.service";

@Controller(deitiesRoute)
@SkipSessionCheck()
export class ServerDeitiesController {
	constructor(private serverDeitiesService: ServerDeitiesService) {}

	@ApiOkResponse({ type: [OverviewObjectDto] })
	@Get("category/:category")
	async getDeitiesByCategory(@Param() param: CategoryParamDto) {
		return this.serverDeitiesService.findDeitiesOfCategory(param.data.category);
	}

	@Get("id/:id")
	async getDeityById(@Param() param: IdParamDto) {
		return this.serverDeitiesService.getDeityById(param.data.id);
	}

	@ApiOkResponse({ type: [OverviewObjectDto] })
	@Get("location/:location")
	async getDeitiesByLocation(@Param() param: LocationParamDto) {
		return this.serverDeitiesService.findDeitiesOfLocation(param.data.location);
	}
}
