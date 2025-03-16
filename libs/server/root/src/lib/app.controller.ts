import { Controller, Get } from "@nestjs/common";

import { SkipSessionCheck } from "@unteris/server/session";
import type { AppService } from "./app.service";

@Controller()
@SkipSessionCheck()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getData() {
		return this.appService.getData();
	}
}
