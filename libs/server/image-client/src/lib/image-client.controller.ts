import { Controller, Get, Param } from "@nestjs/common";
import { TypeschemaDto } from "@nest-lab/typeschema";
import { SkipSessionCheck } from "@unteris/server/session";
import { IdParamSchema } from "@unteris/shared/types";
import { ServerImageClientService } from "./image-client.service";

class IdParamDto extends TypeschemaDto(IdParamSchema) {}

@Controller("image-client")
@SkipSessionCheck()
export class ImageClientController {
	constructor(private readonly service: ServerImageClientService) {}

	@Get("test/:id")
	testConnection(@Param() params: IdParamDto) {
		this.service.sendImageIdForProcessing(params.data.id);
	}
}
