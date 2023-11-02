import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Action, Castle, CastleGuard, Subject } from "@unteris/server/castle";
import { IdParamDto, OverviewObjectDto } from "@unteris/server/common";
import { SkipSessionCheck } from "@unteris/server/session";
import { locationRoute } from "@unteris/shared/types";
import { ByTypeQueryDto } from "./models";
import { LocationCreationDto } from "./models/location-creation.dto";
import { LocationUpdateDto } from "./models/location-update.dto";
import { ServerLocationService } from "./server-location.service";

@ApiTags("Location")
@Controller(locationRoute)
@SkipSessionCheck()
export class ServerLocationController {
	constructor(private readonly service: ServerLocationService) {}
	@ApiOkResponse({ type: [OverviewObjectDto] })
	@Get()
	getAllByType(@Query() query: ByTypeQueryDto) {
		return this.service.getByType(query.data.type);
	}

	@ApiOkResponse({ type: [OverviewObjectDto] })
	@Get("/by-parent/:id")
	getAllByParentId(@Param() params: IdParamDto) {
		return this.service.getByParentId(params.data.id);
	}

	@Get("/id/:id")
	getById(@Param() param: IdParamDto) {
		return this.service.getById(param.data.id);
	}

	@UseInterceptors(
		FileFieldsInterceptor([
			{
				name: "image",
				maxCount: 1,
			},
		]),
	)
	@SkipSessionCheck(false)
	@UseGuards(CastleGuard)
	@Castle([Action.Create, Subject.Location])
	@Post("new")
	create(
		@Body() body: LocationCreationDto,
		@UploadedFiles() files: Record<string, unknown>[],
	) {
		return this.service.createLocation(body.data, files[0]);
	}

	@SkipSessionCheck(false)
	@UseGuards(CastleGuard)
	@Castle([Action.Update, Subject.Location])
	@Patch("/update/:id")
	update(@Body() body: LocationUpdateDto, @Param() param: IdParamDto) {
		return { ...body.data, ...param.data };
	}
}
