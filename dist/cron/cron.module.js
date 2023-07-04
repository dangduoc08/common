"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronModule = void 0;
const cron_controller_1 = require("./cron.controller");
const cron_constant_1 = require("./cron.constant");
class CronModule {
    static cronConfiguration;
    static stats = [];
    static register(cronConfiguration) {
        if (!CronModule.cronConfiguration) {
            CronModule.cronConfiguration = cronConfiguration;
        }
        return {
            module: CronModule,
            controllers: [cron_controller_1.CronController],
            providers: [
                {
                    provide: cron_constant_1.CRON_STATS,
                    useValue: CronModule.stats
                }
            ]
        };
    }
}
exports.CronModule = CronModule;
