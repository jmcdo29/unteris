import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';

@Injectable()
export class ServerHashService {
	async hash(valueToHash: string | Buffer, salt = 12): Promise<string> {
		return hash(valueToHash, { saltLength: salt });
	}

	async verify(plainText: string, hash: string): Promise<boolean> {
		return verify(hash, plainText);
	}
}
