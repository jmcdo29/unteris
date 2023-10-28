import { Controller, Get, Param } from "@nestjs/common";
import { IdParamDto } from "@unteris/server/common";
import { SkipSessionCheck } from "@unteris/server/session";
import { ServerImageClientService } from "./image-client.service";

@Controller("image-client")
@SkipSessionCheck()
export class ImageClientController {
	constructor(private readonly service: ServerImageClientService) {}

	@Get("test/:id")
	testConnection(@Param() params: IdParamDto) {
		this.service.sendImageIdForProcessing(params.data.id);
	}
}
