import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { OverviewObjectDto } from "@unteris/server/common";
import { SkipSessionCheck } from "@unteris/server/session";
import { raceRoute } from "@unteris/shared/types";
import { IdParamDto } from "./models/id-param.dto";
import { ServerRaceService } from "./race.service";

@Controller(raceRoute)
@SkipSessionCheck()
export class ServerRaceController {
	constructor(private serverRaceService: ServerRaceService) {}

	@ApiOkResponse({ type: [OverviewObjectDto] })
	@Get()
	async getAllRaces() {
		return this.serverRaceService.getRaces();
	}

	@Get(":id")
	async getRaceWithAbilities(@Param() param: IdParamDto) {
		return this.serverRaceService.getRaceWithAbilities(param.data.id);
	}
}
