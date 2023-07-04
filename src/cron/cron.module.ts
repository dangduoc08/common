import { DynamicModule } from '@nestjs/common';
import { IStats } from './cron.interface';
import { TCronConfiguration } from './cron.type';
import { CronController } from './cron.controller';
import { CRON_STATS } from './cron.constant';

export class CronModule {
  public static cronConfiguration: TCronConfiguration<string>;
  public static stats: IStats[] = [];

  public static register(
    cronConfiguration: TCronConfiguration<string>
  ): DynamicModule {
    if (!CronModule.cronConfiguration) {
      CronModule.cronConfiguration = cronConfiguration;
    }
    return {
      module: CronModule,
      controllers: [CronController],
      providers: [
        {
          provide: CRON_STATS,
          useValue: CronModule.stats
        }
      ]
    };
  }
}
