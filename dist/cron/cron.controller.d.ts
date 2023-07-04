import { IStats } from './cron.interface';
export declare class CronController {
    private readonly stats;
    constructor(stats: IStats[]);
    getCronStats(): Array<{
        [key: string]: unknown;
    }>;
}
