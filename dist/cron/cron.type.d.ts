import { ICronOption } from './cron.interface';
export type TCronConfiguration<T extends string> = {
    [K in T]: ICronOption;
};
