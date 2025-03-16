import { Controller, Get } from "@nestjs/common";
<<<<<<< HEAD
import { CacheSkip } from "@unteris/server/cache";
import { SkipLoggedInCheck } from "@unteris/server/session";
import { AppService } from "./app.service";
=======

import { SkipSessionCheck } from "@unteris/server/session";
import type { AppService } from "./app.service";
>>>>>>> 6631869 (chore: update code for biome rules)

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
