import Stream from "node:stream";
import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { ServerCastleModule } from "@unteris/server/castle";
import { AuthorizedRequest } from "@unteris/server/common";
import {
	ServerFileStorageModule,
	ServerFileStorageService,
} from "@unteris/server/file-storage";
import { ServerImageClientModule } from "@unteris/server/image-client";
import { KyselyModule } from "@unteris/server/kysely";
import { LocationRepository } from "./location.repository";
import { ServerLocationController } from "./serer-location.controller";
import { ServerLocationService } from "./server-location.service";

@Module({
	imports: [
		KyselyModule,
		ServerCastleModule,
		ServerImageClientModule,
		ServerFileStorageModule,
		MulterModule.registerAsync({
			imports: [ServerFileStorageModule],
			inject: [ServerFileStorageService],
			useFactory: (fileStore: ServerFileStorageService): MulterOptions => ({
				storage: {
					_handleFile: (
						_req: AuthorizedRequest,
						file: {
							fieldname: string;
							originalname: string;
							encoding: string;
							mimetype: string;
							stream: Stream;
						},
						cb: (err: Error | null, data: unknown) => void,
					): void => {
						const { stream: _stream, ...allButStream } = file;
						fileStore
							.writeFileToStore(file.originalname, file.stream)
							.then(() => cb(null, allButStream));
					},
					_removeFile: (
						_req: AuthorizedRequest,
						_file: {
							fieldname: string;
							originalname: string;
							encoding: string;
							mimetype: string;
							stream: Stream;
						},
						cb: (err: Error | null, data: unknown) => void,
					) => {
						cb(null, {});
					},
				},
			}),
		}),
	],
	controllers: [ServerLocationController],
	providers: [ServerLocationService, LocationRepository],
	exports: [ServerLocationService],
})
export class ServerLocationModule {}
