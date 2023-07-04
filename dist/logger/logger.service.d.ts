import { LoggerService } from '@nestjs/common';
import { ILoggerConfiguration } from './logger.interface';
export declare class Logger implements LoggerService {
    private static instance;
    protected static config: ILoggerConfiguration;
    protected static loggerLevel: {
        error: {
            level: number;
            lowerCase: string;
            upperCase: string;
            color: string;
        };
        warn: {
            level: number;
            lowerCase: string;
            upperCase: string;
            color: string;
        };
        info: {
            level: number;
            lowerCase: string;
            upperCase: string;
            color: string;
        };
        debug: {
            level: number;
            lowerCase: string;
            upperCase: string;
            color: string;
        };
    };
    set config(config: ILoggerConfiguration);
    protected static green: (text: string | number) => string;
    protected static cyan: (text: string | number) => string;
    protected static yellow: (text: string | number) => string;
    protected static red: (text: string | number) => string;
    protected static dim: (text: string | number) => string;
    static getInstance(config?: ILoggerConfiguration): Logger;
    private static mergeConfig;
    private static generateTimeStamp;
    private static formatLog;
    private static formatTrace;
    private static printMultilineLog;
    private static printMultilineData;
    private static printMultilineTrace;
    private static printOneLineLog;
    private static printOneLineData;
    private static printOneLineTrace;
    log<T>(message: string, context?: string, data?: T, config?: ILoggerConfiguration): void;
    static log<T>(message: string, context?: string, data?: T, config?: ILoggerConfiguration): void;
    debug<T>(message: string, context?: string, data?: T, config?: ILoggerConfiguration): void;
    static debug<T>(message: string, context?: string, data?: T, config?: ILoggerConfiguration): void;
    warn<T>(message: string, context?: string, data?: T, config?: ILoggerConfiguration): void;
    static warn<T>(message: string, context?: string, data?: T, config?: ILoggerConfiguration): void;
    error<T>(message: string, error: Error, context?: string, data?: T, config?: ILoggerConfiguration): void;
    static error<T>(message: string, error: Error, context?: string, data?: T, config?: ILoggerConfiguration): void;
}
