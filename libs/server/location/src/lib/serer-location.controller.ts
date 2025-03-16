import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseGuards,
} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Action, Castle, CastleGuard, Subject } from "@unteris/server/castle";
import {
	FileUpload,
	type IdParamDto,
	OverviewObjectDto,
} from "@unteris/server/common";
import { SkipSessionCheck } from "@unteris/server/session";
import {
	type Location,
	type LocationWithImage,
	type OverviewObject,
	locationRoute,
} from "@unteris/shared/types";
import {
	type ByTypeQueryDto,
	type ImageFile,
	LocationCreationDto,
	LocationUpdateDto,
} from "./models";
import type { ServerLocationService } from "./server-location.service";

@ApiTags("Location")
@Controller(locationRoute)
@SkipSessionCheck()
export class ServerLocationController {
	constructor(private readonly service: ServerLocationService) {}
	@ApiOkResponse({ type: [OverviewObjectDto] })
	@Get()
	getAllByType(@Query() query: ByTypeQueryDto): Promise<OverviewObject[]> {
		return this.service.getByType(query.data.type);
	}

	@ApiOkResponse({ type: [OverviewObjectDto] })
	@Get("/by-parent/:id")
	getAllByParentId(@Param() params: IdParamDto): Promise<OverviewObject[]> {
		return this.service.getByParentId(params.data.id);
	}

	@Get("/id/:id")
	getById(@Param() param: IdParamDto): Promise<LocationWithImage> {
		return this.service.getById(param.data.id);
	}

	@FileUpload("image", LocationCreationDto)
	@SkipSessionCheck(false)
	@UseGuards(CastleGuard)
	@Castle([Action.Create, Subject.Location])
	@Post("new")
	create(
		@Body() body: LocationCreationDto,
		@UploadedFile() file?: ImageFile,
	): Promise<Location> {
		return this.service.createLocation(body.data, file?.data);
	}

	@FileUpload("image", LocationUpdateDto)
	@SkipSessionCheck(false)
	@UseGuards(CastleGuard)
	@Castle([Action.Update, Subject.Location])
	@Patch("/update/:id")
	update(
		@Body() body: LocationUpdateDto,
		@Param() param: IdParamDto,
		@UploadedFile() file?: ImageFile,
	): Promise<{ success: boolean }> {
		return this.service.updateLocation(param.data.id, body.data, file?.data);
	}
}
