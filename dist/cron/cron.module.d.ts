import { DynamicModule } from '@nestjs/common';
import { IStats } from './cron.interface';
import { TCronConfiguration } from './cron.type';
export declare class CronModule {
    static cronConfiguration: TCronConfiguration<string>;
    static stats: IStats[];
    static register(cronConfiguration: TCronConfiguration<string>): DynamicModule;
}
