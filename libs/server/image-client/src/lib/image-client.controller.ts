import { Controller, Get, Param } from "@nestjs/common";
import { SkipSessionCheck } from "@unteris/server/session";
import { ServerImageClientService } from "./image-client.service";
import { IdParamDto } from "./models";

@Controller("image-client")
@SkipSessionCheck()
export class ImageClientController {
	constructor(private readonly service: ServerImageClientService) {}

	@Get("test/:id")
	testConnection(@Param() params: IdParamDto) {
		this.service.sendImageIdForProcessing(params.data.id);
	}
}
