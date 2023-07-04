import { LoggerService } from '@nestjs/common';
export declare const morganRequestLogger: (logger: LoggerService) => RequestHandler<Request, Response>;
export declare const morganResponseLogger: (logger: LoggerService) => RequestHandler<Request, Response>;
