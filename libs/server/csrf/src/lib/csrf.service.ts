import { Injectable } from '@nestjs/common';
import { generateKey } from 'crypto';

@Injectable()
export class ServerCsrfService {
  async generateToken(): Promise<string> {
    return new Promise((resolve, reject) =>
      generateKey('aes', { length: 256 }, (err, key) => {
        if (err) {
          reject(err);
        }
        resolve(key.export().toString('hex'));
      })
    );
  }
}
