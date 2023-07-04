/// <reference types="node" />
import { HttpService as AxiosService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
export declare class HttpService {
    private readonly axiosService;
    constructor(axiosService: AxiosService);
    download(url: string): Promise<AxiosResponse<Buffer>>;
}
