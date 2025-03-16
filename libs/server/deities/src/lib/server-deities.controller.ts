import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
<<<<<<< HEAD
import { deitiesRoute, OverviewObjectDto } from "@unteris/server/common";
import { SkipLoggedInCheck } from "@unteris/server/session";
import {
	CategoryParamDto,
	GetDeityByIdParamDto,
	GetDeityByIdResponseDto,
	LocationParamDto,
} from "./models";
import { ServerDeitiesService } from "./server-deities.service";
=======
import { OverviewObjectDto } from "@unteris/server/common";
import type { IdParamDto } from "@unteris/server/common";
import { SkipSessionCheck } from "@unteris/server/session";
import { deitiesRoute } from "@unteris/shared/types";
import type { CategoryParamDto } from "./models/category-param.dto";
import type { LocationParamDto } from "./models/location-param.dto";
import type { ServerDeitiesService } from "./server-deities.service";
>>>>>>> 6631869 (chore: update code for biome rules)

@ApiTags("Deity")
@Controller(deitiesRoute)
@SkipLoggedInCheck()
export class ServerDeitiesController {
	constructor(private serverDeitiesService: ServerDeitiesService) {}

	@ApiOkResponse({ type: [OverviewObjectDto] })
	@Get("category/:category")
	async getDeitiesByCategory(@Param() param: CategoryParamDto) {
		return this.serverDeitiesService.findDeitiesOfCategory(param.data.category);
	}

	@ApiOkResponse({ type: GetDeityByIdResponseDto })
	@Get("id/:id")
	async getDeityById(@Param() param: GetDeityByIdParamDto) {
		return this.serverDeitiesService.getDeityById(param.data.id);
	}

	@ApiOkResponse({ type: [OverviewObjectDto] })
	@Get("location/:location")
	async getDeitiesByLocation(@Param() param: LocationParamDto) {
		return this.serverDeitiesService.findDeitiesOfLocation(param.data.location);
	}
}
