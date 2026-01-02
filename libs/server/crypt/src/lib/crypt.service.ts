import { createCipheriv, createDecipheriv } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { ServerConfigService } from "@unteris/server/config";

@Injectable()
export class ServerCryptService {
	private readonly alg = "aes-256-cbc" as const;
	private readonly key: Buffer;
	private readonly iv: Buffer;
	constructor(config: ServerConfigService) {
		this.key = Buffer.from(config.get("ENCRYPTION_KEY"), "hex");
		this.iv = Buffer.from(config.get("ENCRYPTION_IV"), "hex");
	}

	encrypt(data: string): string {
		const cipher = createCipheriv(this.alg, this.key, this.iv);
		let encrypted = cipher.update(data, "utf8", "hex");
		encrypted += cipher.final("hex");
		return encrypted;
	}

	decrypt(data: string): string {
		const decipher = createDecipheriv(this.alg, this.key, this.iv);
		let decrypted = decipher.update(data, "hex", "utf8");
		decrypted += decipher.final("utf8");
		return decrypted;
	}
}
