import { Controller, Get } from "@nestjs/common";
import { CacheSkip } from "@unteris/server/cache";
import { SkipLoggedInCheck } from "@unteris/server/session";
import { AppService } from "./app.service";

@Controller()
@SkipLoggedInCheck()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@CacheSkip()
	getData() {
		return this.appService.getData();
	}
}
