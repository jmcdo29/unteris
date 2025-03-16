import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
<<<<<<< HEAD
import {
	IdParamDto,
	OverviewObjectDto,
	raceRoute,
} from "@unteris/server/common";
import { SkipLoggedInCheck } from "@unteris/server/session";
import { GetRaceByIdResponseDto } from "./models/get-by-id-response.dto";
import { ServerRaceService } from "./race.service";
=======
import { type IdParamDto, OverviewObjectDto } from "@unteris/server/common";
import { SkipSessionCheck } from "@unteris/server/session";
import { raceRoute } from "@unteris/shared/types";
import type { ServerRaceService } from "./race.service";
>>>>>>> 6631869 (chore: update code for biome rules)

@ApiTags("Race")
@Controller(raceRoute)
@SkipLoggedInCheck()
export class ServerRaceController {
	constructor(private serverRaceService: ServerRaceService) {}

	@ApiOkResponse({ type: [OverviewObjectDto] })
	@Get()
	async getAllRaces() {
		return this.serverRaceService.getRaces();
	}

	@ApiOkResponse({ type: GetRaceByIdResponseDto })
	@Get(":id")
	async getRaceWithAbilities(@Param() param: IdParamDto) {
		return this.serverRaceService.getRaceWithAbilities(param.data.id);
	}
}
