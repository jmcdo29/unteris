import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { IdParamDto, OverviewObjectDto } from "@unteris/server/common";
import { SkipSessionCheck } from "@unteris/server/session";
import { raceRoute } from "@unteris/shared/types";
import { ServerRaceService } from "./race.service";

@ApiTags("Race")
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
