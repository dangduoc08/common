"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronExpression = exports.CRON_STATS = exports.CRON_META = void 0;
exports.CRON_META = {
    NAME: 'NAME',
    EXPRESSION: 'EXPRESSION',
    ACTIVE: 'ACTIVE',
    OVERLAP: 'OVERLAP',
    RUN_ON_INIT: 'RUN_ON_INIT',
    RELEASE: 'RELEASE',
    DESCRIPTION: 'DESCRIPTION',
    METHOD: 'METHOD'
};
exports.CRON_STATS = 'CRON_STATS';
var CronExpression;
(function (CronExpression) {
    CronExpression["EVERY_SECOND"] = "* * * * * *";
    CronExpression["EVERY_5_SECONDS"] = "*/5 * * * * *";
    CronExpression["EVERY_10_SECONDS"] = "*/10 * * * * *";
    CronExpression["EVERY_30_SECONDS"] = "*/30 * * * * *";
    CronExpression["EVERY_MINUTE"] = "*/1 * * * *";
    CronExpression["EVERY_5_MINUTES"] = "0 */5 * * * *";
    CronExpression["EVERY_10_MINUTES"] = "0 */10 * * * *";
    CronExpression["EVERY_30_MINUTES"] = "0 */30 * * * *";
    CronExpression["EVERY_HOUR"] = "0 0-23/1 * * *";
    CronExpression["EVERY_2_HOURS"] = "0 0-23/2 * * *";
    CronExpression["EVERY_3_HOURS"] = "0 0-23/3 * * *";
    CronExpression["EVERY_4_HOURS"] = "0 0-23/4 * * *";
    CronExpression["EVERY_5_HOURS"] = "0 0-23/5 * * *";
    CronExpression["EVERY_6_HOURS"] = "0 0-23/6 * * *";
    CronExpression["EVERY_7_HOURS"] = "0 0-23/7 * * *";
    CronExpression["EVERY_8_HOURS"] = "0 0-23/8 * * *";
    CronExpression["EVERY_9_HOURS"] = "0 0-23/9 * * *";
    CronExpression["EVERY_10_HOURS"] = "0 0-23/10 * * *";
    CronExpression["EVERY_11_HOURS"] = "0 0-23/11 * * *";
    CronExpression["EVERY_12_HOURS"] = "0 0-23/12 * * *";
    CronExpression["EVERY_DAY_AT_1AM"] = "0 01 * * *";
    CronExpression["EVERY_DAY_AT_2AM"] = "0 02 * * *";
    CronExpression["EVERY_DAY_AT_3AM"] = "0 03 * * *";
    CronExpression["EVERY_DAY_AT_4AM"] = "0 04 * * *";
    CronExpression["EVERY_DAY_AT_5AM"] = "0 05 * * *";
    CronExpression["EVERY_DAY_AT_6AM"] = "0 06 * * *";
    CronExpression["EVERY_DAY_AT_7AM"] = "0 07 * * *";
    CronExpression["EVERY_DAY_AT_8AM"] = "0 08 * * *";
    CronExpression["EVERY_DAY_AT_9AM"] = "0 09 * * *";
    CronExpression["EVERY_DAY_AT_10AM"] = "0 10 * * *";
    CronExpression["EVERY_DAY_AT_11AM"] = "0 11 * * *";
    CronExpression["EVERY_DAY_AT_NOON"] = "0 12 * * *";
    CronExpression["EVERY_DAY_AT_1PM"] = "0 13 * * *";
    CronExpression["EVERY_DAY_AT_2PM"] = "0 14 * * *";
    CronExpression["EVERY_DAY_AT_3PM"] = "0 15 * * *";
    CronExpression["EVERY_DAY_AT_4PM"] = "0 16 * * *";
    CronExpression["EVERY_DAY_AT_5PM"] = "0 17 * * *";
    CronExpression["EVERY_DAY_AT_6PM"] = "0 18 * * *";
    CronExpression["EVERY_DAY_AT_7PM"] = "0 19 * * *";
    CronExpression["EVERY_DAY_AT_8PM"] = "0 20 * * *";
    CronExpression["EVERY_DAY_AT_9PM"] = "0 21 * * *";
    CronExpression["EVERY_DAY_AT_10PM"] = "0 22 * * *";
    CronExpression["EVERY_DAY_AT_11PM"] = "0 23 * * *";
    CronExpression["EVERY_DAY_AT_MIDNIGHT"] = "0 0 * * *";
    CronExpression["EVERY_WEEK"] = "0 0 * * 0";
    CronExpression["EVERY_WEEKDAY"] = "0 0 * * 1-5";
    CronExpression["EVERY_WEEKEND"] = "0 0 * * 6,0";
    CronExpression["EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT"] = "0 0 1 * *";
    CronExpression["EVERY_1ST_DAY_OF_MONTH_AT_NOON"] = "0 12 1 * *";
    CronExpression["EVERY_2ND_HOUR"] = "0 */2 * * *";
    CronExpression["EVERY_2ND_HOUR_FROM_1AM_THROUGH_11PM"] = "0 1-23/2 * * *";
    CronExpression["EVERY_2ND_MONTH"] = "0 0 1 */2 *";
    CronExpression["EVERY_QUARTER"] = "0 0 1 */3 *";
    CronExpression["EVERY_6_MONTHS"] = "0 0 1 */6 *";
    CronExpression["EVERY_YEAR"] = "0 0 1 1 *";
    CronExpression["EVERY_30_MINUTES_BETWEEN_9AM_AND_5PM"] = "0 */30 9-17 * * *";
    CronExpression["EVERY_30_MINUTES_BETWEEN_9AM_AND_6PM"] = "0 */30 9-18 * * *";
    CronExpression["EVERY_30_MINUTES_BETWEEN_10AM_AND_7PM"] = "0 */30 10-19 * * *";
    CronExpression["MONDAY_TO_FRIDAY_AT_1AM"] = "0 0 01 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_2AM"] = "0 0 02 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_3AM"] = "0 0 03 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_4AM"] = "0 0 04 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_5AM"] = "0 0 05 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_6AM"] = "0 0 06 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_7AM"] = "0 0 07 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_8AM"] = "0 0 08 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_9AM"] = "0 0 09 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_09_30AM"] = "0 30 09 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_10AM"] = "0 0 10 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_11AM"] = "0 0 11 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_11_30AM"] = "0 30 11 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_12PM"] = "0 0 12 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_1PM"] = "0 0 13 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_2PM"] = "0 0 14 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_3PM"] = "0 0 15 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_4PM"] = "0 0 16 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_5PM"] = "0 0 17 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_6PM"] = "0 0 18 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_7PM"] = "0 0 19 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_8PM"] = "0 0 20 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_9PM"] = "0 0 21 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_10PM"] = "0 0 22 * * 1-5";
    CronExpression["MONDAY_TO_FRIDAY_AT_11PM"] = "0 0 23 * * 1-5";
})(CronExpression || (exports.CronExpression = CronExpression = {}));
