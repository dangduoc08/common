import { Controller, Inject, Get } from '@nestjs/common';
import { CRON_STATS } from './cron.constant';
import { IStats } from './cron.interface';

@Controller('crons')
export class CronController {
  constructor(@Inject(CRON_STATS) private readonly stats: IStats[]) {}

  @Get('stats')
  public getCronStats(): Array<{ [key: string]: unknown }> {
    const cronStats = this.stats?.map((cron) => {
      const lastExecutedIn = cron.getLastExecutedIn();
      const parsedLastExecutedIn = lastExecutedIn
        ? `${lastExecutedIn / 1000} sec`
        : null;

      return {
        expression: cron.cronTime,
        name: cron.name,
        bindTo: cron.bindTo,
        description: cron.description || '',
        isLocking: !cron.checkIsRunning(),
        isRunOnInit: cron.isRunOnInit,
        lastExecutedAt: cron.getLastExecutedAt() ?? null,
        lastExecutedIn: parsedLastExecutedIn,
        nextExecuteAt: cron.getNextExecuteAt(),
        overlapState: cron.getCurrentOverlap(),
        maxOverlap: cron.maxOverlap
      };
    });

    return cronStats;
  }
}
