import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UploadedFile,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import {
	FileFieldsInterceptor,
	FileInterceptor,
} from "@nestjs/platform-express";
import {
	ApiBody,
	ApiConsumes,
	ApiExtraModels,
	ApiOkResponse,
	ApiTags,
	getSchemaPath,
} from "@nestjs/swagger";
import { Action, Castle, CastleGuard, Subject } from "@unteris/server/castle";
import { IdParamDto, OverviewObjectDto } from "@unteris/server/common";
import { SkipSessionCheck } from "@unteris/server/session";
import { locationRoute } from "@unteris/shared/types";
import {
	ByTypeQueryDto,
	ImageFile,
	LocationCreationDto,
	LocationUpdateDto,
} from "./models";
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

	@ApiConsumes("multipart/form-data")
	@ApiExtraModels(LocationCreationDto)
	@ApiBody({
		schema: {
			allOf: [
				{ $ref: getSchemaPath(LocationCreationDto) },
				{
					type: "object",
					properties: {
						image: {
							type: "string",
							format: "binary",
						},
					},
				},
			],
		},
	})
	@UseInterceptors(FileInterceptor("image"))
	@SkipSessionCheck(false)
	@UseGuards(CastleGuard)
	@Castle([Action.Create, Subject.Location])
	@Post("new")
	create(@Body() body: LocationCreationDto, @UploadedFile() file?: ImageFile) {
		return this.service.createLocation(body.data, file?.data ?? undefined);
	}

	@SkipSessionCheck(false)
	@UseGuards(CastleGuard)
	@Castle([Action.Update, Subject.Location])
	@Patch("/update/:id")
	update(@Body() body: LocationUpdateDto, @Param() param: IdParamDto) {
		return { ...body.data, ...param.data };
	}
}
