import { generateKey } from "node:crypto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ServerTokenService {
	async generateToken(length: 128 | 192 | 256): Promise<string> {
		return new Promise((resolve, reject) => {
			generateKey("aes", { length }, (err, key) => {
				if (err) {
					return reject(err);
				}
				return resolve(key.export().toString("base64url"));
			});
		});
	}
}
