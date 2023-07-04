import { HTTPService } from './services';
export declare class HTTPProvider {
    private readonly httpService;
    constructor(httpService: HTTPService);
    saveImageAsWebp(url: string, dir: string, imgName: string): Promise<string>;
}
