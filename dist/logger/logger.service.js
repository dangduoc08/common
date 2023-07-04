"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const path_1 = require("path");
const util_1 = require("util");
class Logger {
    static instance;
    static config = {
        timestamp: true,
        pid: true,
        colorize: true,
        multiline: true,
        showHidden: true,
        showData: true,
        depth: true,
        level: 2
    };
    static loggerLevel = {
        error: {
            level: 0,
            lowerCase: 'error',
            upperCase: 'ERROR',
            color: 'red'
        },
        warn: {
            level: 1,
            lowerCase: 'warn',
            upperCase: 'WARN',
            color: 'yellow'
        },
        info: {
            level: 2,
            lowerCase: 'info',
            upperCase: 'INFO',
            color: 'green'
        },
        debug: {
            level: 3,
            lowerCase: 'debug',
            upperCase: 'DEBUG',
            color: 'cyan'
        }
    };
    set config(config) {
        Logger.config = Logger.mergeConfig(config);
    }
    static green = (text) => `\x1b[32m${text}\x1b[0m`;
    static cyan = (text) => `\x1b[36m${text}\x1b[0m`;
    static yellow = (text) => `\x1b[33m${text}\x1b[0m`;
    static red = (text) => `\x1b[31m${text}\x1b[0m`;
    static dim = (text) => `\x1b[2m${text}\x1b[0m`;
    static getInstance(config) {
        if (!Logger.instance) {
            Logger.instance = new Logger();
            Logger.config = Logger.mergeConfig(config);
        }
        return Logger.instance;
    }
    static mergeConfig(config = {}) {
        return {
            ...Logger.config,
            ...config
        };
    }
    static generateTimeStamp() {
        const timestamp = new Date(Date.now()).toLocaleString(undefined, {
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            day: '2-digit',
            month: '2-digit'
        });
        return timestamp;
    }
    static formatLog(lowerCase, upperCase, message, context, config) {
        const { colorize: isColorize, timestamp, pid } = config;
        const formattedTimestamp = timestamp
            ? ` ${Logger.generateTimeStamp()} `
            : ' ';
        let formattedPID = pid ? ` ${process.pid}` : '';
        let formattedLevel = `[${upperCase}]`;
        let formattedContext = context ? `[${context}] ` : '';
        let formattedMessage = message;
        const color = Logger.loggerLevel[lowerCase].color;
        if (isColorize) {
            formattedLevel =
                Logger[color](formattedLevel);
            formattedContext = Logger.yellow(formattedContext);
            formattedPID = Logger.green(formattedPID);
            formattedMessage =
                Logger[color](formattedMessage);
        }
        return {
            formattedLevel,
            formattedContext,
            formattedMessage,
            formattedTimestamp,
            formattedPID
        };
    }
    static formatTrace(errorTrace, callback) {
        errorTrace.forEach((trace, index) => {
            const trimedTrace = trace.trim();
            if (trimedTrace.startsWith('at')) {
                const trimedRawTrace = trimedTrace.replace('at', '').trim();
                const additionalInfo = trimedRawTrace.match(/\((.*?)\)/g);
                const filePath = Array.isArray(additionalInfo) && additionalInfo.length > 0
                    ? additionalInfo[0].replace(/\(|\)/g, '')
                    : trimedRawTrace;
                const parsedFilePath = (0, path_1.parse)(filePath);
                const hasFileName = !!parsedFilePath.ext;
                let fileName = parsedFilePath.base;
                const lastIndexOfColon = fileName.lastIndexOf(':');
                hasFileName && lastIndexOfColon > -1
                    ? (fileName = fileName.substring(0, lastIndexOfColon))
                    : (fileName = '');
                const invokedFunction = Array.isArray(additionalInfo) && additionalInfo.length > 0
                    ? trimedRawTrace.replace(/\((.*?)\).*/g, '').trim()
                    : '';
                callback({
                    invokedFunction,
                    fileName,
                    filePath
                }, index);
            }
        });
    }
    static printMultilineLog(logs) {
        const { formattedContext, formattedMessage, formattedLevel, formattedTimestamp, formattedPID } = logs;
        process.stdout.write(`${formattedLevel}${formattedPID}${formattedTimestamp}${formattedContext}${formattedMessage}\n`);
    }
    static printMultilineData(data, config) {
        if (data !== undefined) {
            const { depth, colorize, showHidden } = config;
            let depthLevel = null;
            if (depth === true) {
                depthLevel = null;
            }
            else if (depth === false) {
                depthLevel = -1;
            }
            else if (!Number.isNaN(depth)) {
                depthLevel = depth;
            }
            const formattedData = (0, util_1.inspect)(data, {
                depth: depthLevel,
                colors: colorize,
                showHidden
            });
            process.stdout.write(`${formattedData}\n`);
        }
    }
    static printMultilineTrace(trace, config) {
        if (trace) {
            let colorizedInvokedFn = trace.invokedFunction
                ? `${trace.invokedFunction} `
                : '';
            let colorizedFilePath = trace.filePath ? trace.filePath : '';
            const fileName = trace.fileName ? trace.fileName : '';
            let dash = '-';
            if (config.colorize) {
                colorizedInvokedFn = Logger.yellow(colorizedInvokedFn);
                colorizedFilePath = Logger.dim(colorizedFilePath);
                dash = Logger.dim(dash);
            }
            process.stdout.write(`${dash} ${colorizedInvokedFn}${fileName}\n`);
            process.stdout.write(`  ${colorizedFilePath}\n`);
        }
    }
    static printOneLineLog(logs, breakLine) {
        const { formattedContext, formattedMessage, formattedLevel, formattedTimestamp, formattedPID } = logs;
        const br = breakLine ? '\n' : ' ';
        process.stdout.write(`${formattedLevel}${formattedPID}${formattedTimestamp}${formattedContext}${formattedMessage}${br}`);
    }
    static printOneLineData(data, config, breakLine) {
        if (data !== undefined) {
            const { depth, colorize, showHidden } = config;
            const br = breakLine ? '\n' : ' ';
            let depthLevel = null;
            if (depth === true) {
                depthLevel = null;
            }
            else if (depth === false) {
                depthLevel = -1;
            }
            else if (!Number.isNaN(depth)) {
                depthLevel = depth;
            }
            const breakLength = 999999;
            const formattedData = (0, util_1.inspect)(data, {
                colors: colorize,
                depth: depthLevel,
                showHidden,
                breakLength,
                compact: breakLength
            });
            process.stdout.write(`${formattedData}${br}`);
        }
        else {
            process.stdout.write('\n');
        }
    }
    static printOneLineTrace(trace, breakLine) {
        const br = breakLine ? '\n' : ' ';
        process.stdout.write(`${trace}${br}`);
    }
    log(message, context = '', data, config) {
        return Logger.log(message, context, data, config);
    }
    static log(message, context = '', data, config) {
        const infoConfig = Logger.loggerLevel.info;
        const lowerCase = infoConfig.lowerCase;
        const upperCase = infoConfig.upperCase;
        let mergedConfig = Logger.config;
        if (config) {
            mergedConfig = Logger.mergeConfig(config);
        }
        if ((mergedConfig?.level ?? 0) - infoConfig.level < 0) {
            return;
        }
        const logs = Logger.formatLog(lowerCase, upperCase, message, context, mergedConfig);
        if (mergedConfig.multiline) {
            Logger.printMultilineLog(logs);
            if (mergedConfig.showData) {
                Logger.printMultilineData(data, mergedConfig);
            }
        }
        else {
            Logger.printOneLineLog(logs, !mergedConfig.showData);
            if (mergedConfig.showData) {
                Logger.printOneLineData(data, mergedConfig, true);
            }
        }
    }
    debug(message, context = '', data, config) {
        return Logger.debug(message, context, data, config);
    }
    static debug(message, context = '', data, config) {
        const debugInfo = Logger.loggerLevel.debug;
        const lowerCase = debugInfo.lowerCase;
        const upperCase = debugInfo.upperCase;
        let mergedConfig = Logger.config;
        if (config) {
            mergedConfig = Logger.mergeConfig(config);
        }
        if (typeof config?.depth !== 'number') {
            mergedConfig.depth = true;
        }
        if ((mergedConfig?.level ?? 0) - debugInfo.level < 0) {
            return;
        }
        const logs = Logger.formatLog(lowerCase, upperCase, message, context, mergedConfig);
        if (mergedConfig.multiline) {
            Logger.printMultilineLog(logs);
            if (mergedConfig.showData) {
                Logger.printMultilineData(data, mergedConfig);
            }
        }
        else {
            Logger.printOneLineLog(logs, !mergedConfig.showData);
            if (mergedConfig.showData) {
                Logger.printOneLineData(data, mergedConfig, true);
            }
        }
    }
    warn(message, context = '', data, config) {
        return Logger.warn(message, context, data, config);
    }
    static warn(message, context = '', data, config) {
        const warnConfig = Logger.loggerLevel.warn;
        const lowerCase = warnConfig.lowerCase;
        const upperCase = warnConfig.upperCase;
        let mergedConfig = Logger.config;
        if (config) {
            mergedConfig = Logger.mergeConfig(config);
        }
        if ((mergedConfig?.level ?? 0) - warnConfig.level < 0) {
            return;
        }
        const logs = Logger.formatLog(lowerCase, upperCase, message, context, mergedConfig);
        if (mergedConfig.multiline) {
            Logger.printMultilineLog(logs);
            if (mergedConfig.showData) {
                Logger.printMultilineData(data, mergedConfig);
            }
        }
        else {
            Logger.printOneLineLog(logs, !mergedConfig.showData);
            if (mergedConfig.showData) {
                Logger.printOneLineData(data, mergedConfig, true);
            }
        }
    }
    error(message, error, context = '', data, config) {
        return Logger.error(message, error, context, data, config);
    }
    static error(message, error, context = '', data, config) {
        const lowerCase = Logger.loggerLevel.error.lowerCase;
        const upperCase = Logger.loggerLevel.error.upperCase;
        let mergedConfig = Logger.config;
        if (config) {
            mergedConfig = Logger.mergeConfig(config);
        }
        const logs = Logger.formatLog(lowerCase, upperCase, message, context, mergedConfig);
        const isError = error instanceof Error;
        if (mergedConfig.multiline) {
            Logger.printMultilineLog(logs);
            if (mergedConfig.showData) {
                Logger.printMultilineData(data, mergedConfig);
            }
            if (isError) {
                const errorStack = error.stack || '';
                const errorTrace = errorStack.split('\n');
                Logger.formatTrace(errorTrace, (eachTrace) => {
                    Logger.printMultilineTrace(eachTrace, mergedConfig);
                });
            }
        }
        else {
            Logger.printOneLineLog(logs, !mergedConfig.showData && !isError);
            if (mergedConfig.showData) {
                Logger.printOneLineData(data, mergedConfig, false);
            }
            if (isError) {
                const errorStack = error.stack || '';
                const errorTrace = errorStack.split('\n');
                const totalTrace = errorTrace.length;
                let printedTrace = '';
                Logger.formatTrace(errorTrace, (eachTrace, index) => {
                    const willPrintSpace = !printedTrace ? '' : ' ';
                    const willPrintComma = index === totalTrace - 1 ? '' : ',';
                    if (eachTrace) {
                        let colorizedInvokedFn = eachTrace.invokedFunction
                            ? `${eachTrace.invokedFunction} `
                            : '';
                        let colorizedFilePath = eachTrace.filePath
                            ? `(${eachTrace.filePath})`.replace(process.cwd(), '')
                            : '';
                        if (mergedConfig.colorize) {
                            colorizedInvokedFn = Logger.yellow(colorizedInvokedFn);
                            colorizedFilePath = Logger.dim(colorizedFilePath);
                        }
                        printedTrace += `${willPrintSpace}${colorizedInvokedFn}${colorizedFilePath}${willPrintComma}`;
                    }
                });
                Logger.printOneLineTrace(printedTrace, true);
            }
        }
    }
}
exports.Logger = Logger;
