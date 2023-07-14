import { writeFile } from 'fs/promises';
import { extname, join } from 'path';
import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { HTTPService } from './services';

@Injectable()
export class HTTPProvider {
  constructor(private readonly httpService: HTTPService) {}

  public async saveImageAsWEBP(
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

  public async saveAsSVG(
    url: string,
    dir: string,
    filename: string
  ): Promise<string> {
    const downloadResponse = await this.httpService.download(url);
    dir = join(process.cwd(), dir);
    filename = filename.replace(extname(filename), '') + '.svg';
    const webpPath = dir + '/' + filename;
    await writeFile(webpPath, downloadResponse.data.toString(), 'utf-8');

    return webpPath;
  }
}
