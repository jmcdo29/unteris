import { Module } from '@nestjs/common';
import {
  ServerConfigModule,
  ServerConfigService,
} from '@unteris/server/config';
import { ServerFileStorageService } from './file-storage.service';
import { FILE_LOCAL_CONFIG_TOKEN } from './file-storage.constants';
import { LocalStoreConfig } from './file-manager.interface';
import { LocalStore } from './local.store';

@Module({
  imports: [ServerConfigModule],
  providers: [
    ServerFileStorageService,
    {
      provide: FILE_LOCAL_CONFIG_TOKEN,
      inject: [ServerConfigService],
      useFactory: (config: ServerConfigService): LocalStoreConfig => {
        return {
          path: config.get('FILE_PATH'),
        };
      },
    },
    LocalStore,
  ],
  exports: [ServerFileStorageService],
})
export class ServerFileStorageModule {}
