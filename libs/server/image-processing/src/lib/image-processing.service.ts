import { Injectable } from "@nestjs/common";
import type { ServerFileStorageService } from "@unteris/server/file-storage";
import sharp from "sharp";
import type { ImageRepo } from "./image.repository";

@Injectable()
export class ServerImageProcessingService {
	constructor(
		private readonly fileStorage: ServerFileStorageService,
		private readonly imageRepo: ImageRepo,
	) {}

	async processImage(imageId: string): Promise<void> {
		const { originalUrl } = (await this.imageRepo.getImageById(imageId)) ?? {};
		if (!originalUrl) {
			return;
		}
		const file = await this.fileStorage.readFileFromStore(originalUrl);
		const [name, ...path] = originalUrl.split("/").reverse();
		const [small, medium, large] = await Promise.all([
			sharp(file)
				.resize(256, 384, { fit: "inside" })
				.toFormat("webp")
				.toBuffer(),
			sharp(file)
				.resize(512, 768, { fit: "inside" })
				.toFormat("webp")
				.toBuffer(),
			sharp(file)
				.resize(1536, 2304, { fit: "inside" })
				.toFormat("webp")
				.toBuffer(),
		]);
		const newPath = path.reverse();
		const fileNames = ["sm", "md", "lg"].map(
			(size) => `${newPath.join("/")}/${name.split(".")[0]}_${size}.webp`,
		);
		await Promise.all([
			this.fileStorage.writeFileToStore(fileNames[0], small),
			this.fileStorage.writeFileToStore(fileNames[1], medium),
			this.fileStorage.writeFileToStore(fileNames[2], large),
		]);
		await this.imageRepo.updateImageUrls(imageId, {
			small: fileNames[0],
			medium: fileNames[1],
			large: fileNames[2],
		});
	}
}
