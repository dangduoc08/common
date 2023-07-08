import { Injectable } from '@nestjs/common';
import { join, extname } from 'path';
import { writeFile, readFile, access, mkdir, readdir } from 'fs/promises';

@Injectable()
export class FileProvider {
  public async createDir(dir: string): Promise<void> {
    const dirPaths = dir.split('/');
    let cwd = process.cwd();

    for (const path of dirPaths) {
      dir = join(cwd, path);
      cwd = dir;
      try {
        await access(dir);
      } catch {
        await mkdir(dir);
      }
    }
  }

  public async writeJson<T>(
    dir: string,
    filename: string,
    data: T
  ): Promise<void> {
    dir = join(process.cwd(), dir);
    filename = filename.replace(extname(filename), '') + '.json';

    await writeFile(
      dir + '/' + filename,
      JSON.stringify(data, null, 2),
      'utf-8'
    );
  }

  public async readJson<T>(dir: string, filename: string): Promise<T> {
    dir = join(process.cwd(), dir);
    filename = filename.replace(extname(filename), '') + '.json';

    try {
      const data = await readFile(dir + '/' + filename);
      return JSON.parse(data.toString());
    } catch {
      return null as unknown as T;
    }
  }

  public async getFiles(
    dir: string,
    ...fileTypes: string[]
  ): Promise<string[]> {
    dir = join(process.cwd(), dir);
    const listFiles = await readdir(dir);
    fileTypes = fileTypes.map((extname) =>
      extname[0] === '.' ? extname : '.' + extname
    );
    const jsonFiles = listFiles.filter((files) =>
      fileTypes.includes(extname(files))
    );
    return jsonFiles;
  }
}
