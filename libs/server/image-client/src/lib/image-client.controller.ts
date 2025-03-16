import { Controller, Get, Param } from "@nestjs/common";
<<<<<<< HEAD
import { IdParamDto } from "@unteris/server/common";
import { SkipLoggedInCheck } from "@unteris/server/session";
import { ServerImageClientService } from "./image-client.service";
=======
import type { IdParamDto } from "@unteris/server/common";
import { SkipSessionCheck } from "@unteris/server/session";
import type { ServerImageClientService } from "./image-client.service";
>>>>>>> 6631869 (chore: update code for biome rules)

@Controller("image-client")
@SkipLoggedInCheck()
export class ImageClientController {
	constructor(private readonly service: ServerImageClientService) {}

	@Get("test/:id")
	testConnection(@Param() params: IdParamDto) {
		this.service.sendImageIdForProcessing(params.data.id);
	}
}
