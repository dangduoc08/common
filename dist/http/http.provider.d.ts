import { HTTPService } from './services';
export declare class HTTPProvider {
    private readonly httpService;
    constructor(httpService: HTTPService);
    saveImageAsWEBP(url: string, dir: string, imgName: string): Promise<string>;
    saveAsSVG(url: string, dir: string, filename: string): Promise<string>;
}
