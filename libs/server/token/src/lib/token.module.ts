import { Module } from '@nestjs/common';
import { ServerTokenService } from './token.service';

@Module({
	controllers: [],
	providers: [ServerTokenService],
	exports: [ServerTokenService],
})
export class ServerTokenModule {}
