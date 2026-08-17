import { Controller, Get, Param } from "@nestjs/common";
import { IdParamDto } from "@unteris/server/common";
import { SkipLoggedInCheck } from "@unteris/server/session";
import { ServerImageClientService } from "./image-client.service";

@Controller("image-client")
@SkipLoggedInCheck()
export class ImageClientController {
	constructor(private readonly service: ServerImageClientService) {}

	@Get("test/:id")
	testConnection(@Param() params: IdParamDto) {
		this.service.sendImageIdForProcessing(params.data.id);
	}
}
