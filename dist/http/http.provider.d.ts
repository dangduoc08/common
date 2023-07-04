import { HttpService } from './services';
export declare class HttpProvider {
    private readonly httpService;
    constructor(httpService: HttpService);
    saveImageAsWebp(url: string, dir: string, imgName: string): Promise<string>;
}
