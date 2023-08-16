import { Module } from '@nestjs/common';
import { ServerImageProcessingModule } from '@unteris/server/image-processing';
import { KyselyModule } from '@unteris/server/kysely';
import { ServerLoggingModule } from '@unteris/server/logging';

@Module({
  imports: [
    ServerLoggingModule.forApplication('Unteris Image', 'DEBUG'),
    KyselyModule,
    ServerImageProcessingModule,
  ],
})
export class ImageRootModule {}
