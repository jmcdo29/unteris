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
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiTags,
} from "@nestjs/swagger";
import { Action, Castle, CastleGuard, Subject } from "@unteris/server/castle";
import {
	FileUpload,
	IdParamDto,
	locationRoute,
	OverviewObject,
	OverviewObjectDto,
} from "@unteris/server/common";
import { SkipLoggedInCheck } from "@unteris/server/session";
import {
	ByTypeQueryDto,
	GetLocationByIdResponse,
	GetLocationByIdResponseDto,
	ImageFile,
	LocationCreateResponse,
	LocationCreateResponseDto,
	LocationCreationDto,
	LocationUpdateDto,
	LocationUpdateResponseDto,
} from "./models";
import { ServerLocationService } from "./server-location.service";

@ApiTags("Location")
@Controller(locationRoute)
@SkipLoggedInCheck()
export class ServerLocationController {
	constructor(private readonly service: ServerLocationService) {}
	@ApiOkResponse({ type: [OverviewObjectDto] })
	@Get()
	getAllByType(@Query() query: ByTypeQueryDto) {
		return this.service.getByType(query.data);
	}

	@ApiOkResponse({ type: [OverviewObjectDto] })
	@Get("/by-parent/:id")
	getAllByParentId(@Param() params: IdParamDto): Promise<OverviewObject[]> {
		return this.service.getByParentId(params.data.id);
	}

	@ApiOkResponse({ type: GetLocationByIdResponseDto })
	@Get("/id/:id")
	getById(@Param() param: IdParamDto): Promise<GetLocationByIdResponse> {
		return this.service.getById(param.data.id);
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({ type: LocationCreateResponseDto })
	@FileUpload("image", LocationCreationDto)
	@SkipLoggedInCheck(false)
	@UseGuards(CastleGuard)
	@Castle([Action.Create, Subject.Location])
	@Post("new")
	create(
		@Body() body: LocationCreationDto,
		@UploadedFile() file?: ImageFile,
	): Promise<LocationCreateResponse> {
		return this.service.createLocation(body.data, file?.data);
	}

	@ApiBearerAuth()
	@ApiOkResponse({ type: LocationUpdateResponseDto })
	@FileUpload("image", LocationUpdateDto)
	@SkipLoggedInCheck(false)
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
