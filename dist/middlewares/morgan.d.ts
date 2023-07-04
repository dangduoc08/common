import { LoggerService } from '@nestjs/common';
import { RequestHandler, Request, Response } from 'express';
export declare const morganRequestLogger: (logger: LoggerService) => RequestHandler<Request, Response>;
export declare const morganResponseLogger: (logger: LoggerService) => RequestHandler<Request, Response>;
