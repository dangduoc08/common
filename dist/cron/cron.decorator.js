"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Release = exports.Cron = exports.Scheduler = void 0;
const cron_1 = require("cron");
const cron_module_1 = require("./cron.module");
const cron_constant_1 = require("./cron.constant");
const Scheduler = () => function (Constructor) {
    return class extends Constructor {
        constructor(...args) {
            super(...args);
            const metaDataKeys = Reflect.getMetadataKeys(this) || [];
            metaDataKeys.forEach((key) => {
                const expression = Reflect.getMetadata(key, this)[cron_constant_1.CRON_META.EXPRESSION];
                const name = Reflect.getMetadata(key, this)[cron_constant_1.CRON_META.NAME];
                const active = Reflect.getMetadata(key, this)[cron_constant_1.CRON_META.ACTIVE];
                if (expression && active) {
                    const overlap = Reflect.getMetadata(key, this)[cron_constant_1.CRON_META.OVERLAP] ?? 1;
                    const runOnInit = Reflect.getMetadata(key, this)[cron_constant_1.CRON_META.RUN_ON_INIT] ?? false;
                    const releaseIndex = Reflect.getMetadata(key, this)[cron_constant_1.CRON_META.RELEASE];
                    const description = Reflect.getMetadata(key, this)[cron_constant_1.CRON_META.DESCRIPTION];
                    let cronLocker = 0;
                    const dynamicArgs = [];
                    let releaseWrapper = (startTime) => () => !!startTime;
                    const onTick = () => {
                        dynamicArgs[releaseIndex] = releaseWrapper;
                        if (dynamicArgs[releaseIndex]) {
                            dynamicArgs[releaseIndex] = dynamicArgs[releaseIndex](new Date().getTime());
                        }
                        Reflect.getMetadata(key, this)[cron_constant_1.CRON_META.METHOD].apply(this, dynamicArgs);
                    };
                    const job = new cron_1.CronJob({
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
                    let lastExecutedIn = 0;
                    releaseWrapper =
                        (startTime) => () => {
                            lastExecutedIn = new Date().getTime() - startTime;
                            --cronLocker;
                            if (cronLocker < overlap) {
                                job.start();
                            }
                            return true;
                        };
                    dynamicArgs[releaseIndex] = releaseWrapper;
                    cron_module_1.CronModule.stats.push({
                        getNextExecuteAt: () => job
                            .nextDate()
                            .toJSDate()
                            .toLocaleString('en-US', { hour12: false }),
                        getLastExecutedAt: () => job.lastDate()?.toLocaleString('en-US', { hour12: false }),
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
exports.Scheduler = Scheduler;
const Cron = (cronOption) => function (target, key, descriptor) {
    const metaData = Reflect.getMetadata(key, target);
    const { expression, active, overlap, runOnInit, name, description } = cronOption;
    if (!metaData) {
        const value = {
            [cron_constant_1.CRON_META.EXPRESSION]: expression,
            [cron_constant_1.CRON_META.ACTIVE]: active,
            [cron_constant_1.CRON_META.OVERLAP]: overlap,
            [cron_constant_1.CRON_META.RUN_ON_INIT]: runOnInit,
            [cron_constant_1.CRON_META.METHOD]: descriptor.value,
            [cron_constant_1.CRON_META.DESCRIPTION]: description,
            [cron_constant_1.CRON_META.NAME]: name
        };
        Reflect.defineMetadata(key, value, target);
    }
    else {
        metaData[cron_constant_1.CRON_META.EXPRESSION] = expression;
        metaData[cron_constant_1.CRON_META.ACTIVE] = active;
        metaData[cron_constant_1.CRON_META.OVERLAP] = overlap;
        metaData[cron_constant_1.CRON_META.RUN_ON_INIT] = runOnInit;
        metaData[cron_constant_1.CRON_META.METHOD] = descriptor.value;
        metaData[cron_constant_1.CRON_META.DESCRIPTION] = description;
        metaData[cron_constant_1.CRON_META.NAME] = name;
        Reflect.defineMetadata(key, metaData, target);
    }
    return descriptor;
};
exports.Cron = Cron;
const Release = () => function (target, key, index) {
    const metaData = Reflect.getMetadata(key, target);
    if (!metaData) {
        const value = {
            [cron_constant_1.CRON_META.RELEASE]: index
        };
        Reflect.defineMetadata(key, value, target);
    }
    else {
        metaData[cron_constant_1.CRON_META.RELEASE] = index;
        Reflect.defineMetadata(key, metaData, target);
    }
};
exports.Release = Release;
