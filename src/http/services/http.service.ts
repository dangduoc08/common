import { Injectable } from '@nestjs/common';
import { HttpService as AxiosService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class HttpService {
  constructor(private readonly axiosService: AxiosService) {}

  public async download(url: string): Promise<AxiosResponse<Buffer>> {
    return await this.axiosService.axiosRef({
      url,
      responseType: 'arraybuffer'
    });
  }
}
