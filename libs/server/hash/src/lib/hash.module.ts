import { Module } from '@nestjs/common';
import { ServerHashService } from './hash.service';

@Module({
	controllers: [],
	providers: [ServerHashService],
	exports: [ServerHashService],
})
export class ServerHashModule {}
