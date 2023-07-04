import { extname, join } from 'path';
import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { HttpService } from './services';

@Injectable()
export class HttpProvider {
  constructor(private readonly httpService: HttpService) {}

  public async saveImageAsWebp(
    url: string,
    dir: string,
    imgName: string
  ): Promise<string> {
    const downloadResponse = await this.httpService.download(url);
    dir = join(process.cwd(), dir);
    imgName = imgName.replace(extname(imgName), '') + '.webp';
    const webpPath = dir + '/' + imgName;

    sharp(downloadResponse.data).webp().toFile(webpPath);
    return webpPath;
  }
}
