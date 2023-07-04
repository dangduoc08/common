"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const cron_constant_1 = require("./cron.constant");
let CronController = exports.CronController = class CronController {
    stats;
    constructor(stats) {
        this.stats = stats;
    }
    getCronStats() {
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
};
tslib_1.__decorate([
    (0, common_1.Get)('stats'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Array)
], CronController.prototype, "getCronStats", null);
exports.CronController = CronController = tslib_1.__decorate([
    (0, common_1.Controller)('crons'),
    tslib_1.__param(0, (0, common_1.Inject)(cron_constant_1.CRON_STATS)),
    tslib_1.__metadata("design:paramtypes", [Array])
], CronController);
