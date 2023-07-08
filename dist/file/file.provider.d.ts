export declare class FileProvider {
    createDir(dir: string): Promise<void>;
    writeJson<T>(dir: string, filename: string, data: T): Promise<void>;
    readJson<T>(dir: string, filename: string): Promise<T>;
    getFiles(dir: string, ...fileTypes: string[]): Promise<string[]>;
}
