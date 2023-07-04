/* eslint-disable @typescript-eslint/no-explicit-any */
import { CronJob } from 'cron';
import { CronModule } from './cron.module';
import { CRON_META } from './cron.constant';
import { ICronOption } from './cron.interface';

const Scheduler = () =>
  function <T extends new (...agrs: any[]) => object>(Constructor: T): any {
    return class extends Constructor {
      constructor(...args: any[]) {
        super(...args);
        const metaDataKeys = Reflect.getMetadataKeys(this) || [];
        metaDataKeys.forEach((key: string) => {
          const expression: string = Reflect.getMetadata(key, this)[
            CRON_META.EXPRESSION
          ];
          const name: string = Reflect.getMetadata(key, this)[CRON_META.NAME];
          const active: boolean = Reflect.getMetadata(key, this)[
            CRON_META.ACTIVE
          ];
          if (expression && active) {
            const overlap: number =
              Reflect.getMetadata(key, this)[CRON_META.OVERLAP] ?? 1;
            const runOnInit: boolean =
              Reflect.getMetadata(key, this)[CRON_META.RUN_ON_INIT] ?? false;
            const releaseIndex: number = Reflect.getMetadata(key, this)[
              CRON_META.RELEASE
            ];
            const description: string = Reflect.getMetadata(key, this)[
              CRON_META.DESCRIPTION
            ];
            let cronLocker: number = 0;
            const dynamicArgs: any[] = [];
            // pseudo impl
            let releaseWrapper = (startTime: number) => () => !!startTime;

            const onTick = (): void => {
              dynamicArgs[releaseIndex] = releaseWrapper;
              if (dynamicArgs[releaseIndex]) {
                dynamicArgs[releaseIndex] = dynamicArgs[releaseIndex](
                  new Date().getTime()
                );
              }
              Reflect.getMetadata(key, this)[CRON_META.METHOD].apply(
                this,
                dynamicArgs
              );
            };

            const job = new CronJob({
              cronTime: expression,
              onTick,
              start: true,
              runOnInit
            });

            job.addCallback(() => {
              ++cronLocker;
              if (cronLocker >= overlap) {
                job.stop();
              }
            });

            let lastExecutedIn: number = 0;
            releaseWrapper =
              (startTime: number): (() => boolean) =>
              () => {
                lastExecutedIn = new Date().getTime() - startTime;
                --cronLocker;
                if (cronLocker < overlap) {
                  job.start();
                }
                return true;
              };

            dynamicArgs[releaseIndex] = releaseWrapper;

            CronModule.stats.push({
              getNextExecuteAt: () =>
                job
                  .nextDate()
                  .toJSDate()
                  .toLocaleString('en-US', { hour12: false }),
              getLastExecutedAt: () =>
                job.lastDate()?.toLocaleString('en-US', { hour12: false }),
              getLastExecutedIn: () => lastExecutedIn,
              checkIsRunning: () => job.running || false,
              getCurrentOverlap: () => cronLocker,
              maxOverlap: overlap,
              cronTime: expression,
              bindTo: key,
              isRunOnInit: runOnInit,
              name,
              description
            });
          }
        });
      }
    };
  };

const Cron = (cronOption: ICronOption) =>
  function (
    target: object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const metaData = Reflect.getMetadata(key, target);
    const { expression, active, overlap, runOnInit, name, description } =
      cronOption;

    if (!metaData) {
      const value = {
        [CRON_META.EXPRESSION]: expression,
        [CRON_META.ACTIVE]: active,
        [CRON_META.OVERLAP]: overlap,
        [CRON_META.RUN_ON_INIT]: runOnInit,
        [CRON_META.METHOD]: descriptor.value,
        [CRON_META.DESCRIPTION]: description,
        [CRON_META.NAME]: name
      };
      Reflect.defineMetadata(key, value, target);
    } else {
      metaData[CRON_META.EXPRESSION] = expression;
      metaData[CRON_META.ACTIVE] = active;
      metaData[CRON_META.OVERLAP] = overlap;
      metaData[CRON_META.RUN_ON_INIT] = runOnInit;
      metaData[CRON_META.METHOD] = descriptor.value;
      metaData[CRON_META.DESCRIPTION] = description;
      metaData[CRON_META.NAME] = name;
      Reflect.defineMetadata(key, metaData, target);
    }

    return descriptor;
  };

const Release = () =>
  function (target: object, key: string, index: number): void {
    const metaData = Reflect.getMetadata(key, target);
    if (!metaData) {
      const value = {
        [CRON_META.RELEASE]: index
      };
      Reflect.defineMetadata(key, value, target);
    } else {
      metaData[CRON_META.RELEASE] = index;
      Reflect.defineMetadata(key, metaData, target);
    }
  };

export { Scheduler, Cron, Release };
