"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileProvider = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const promises_1 = require("fs/promises");
let FileProvider = exports.FileProvider = class FileProvider {
    async createDir(dir) {
        const dirPaths = dir.split('/');
        let cwd = process.cwd();
        for (const path of dirPaths) {
            dir = (0, path_1.join)(cwd, path);
            cwd = dir;
            try {
                await (0, promises_1.access)(dir);
            }
            catch {
                await (0, promises_1.mkdir)(dir);
            }
        }
    }
    async writeJson(dir, filename, data) {
        dir = (0, path_1.join)(process.cwd(), dir);
        filename = filename.replace((0, path_1.extname)(filename), '') + '.json';
        await (0, promises_1.writeFile)(dir + '/' + filename, JSON.stringify(data));
    }
    async readJson(dir, filename) {
        dir = (0, path_1.join)(process.cwd(), dir);
        filename = filename.replace((0, path_1.extname)(filename), '') + '.json';
        try {
            const data = await (0, promises_1.readFile)(dir + '/' + filename);
            return JSON.parse(data.toString());
        }
        catch {
            return null;
        }
    }
    async getFiles(dir, fileTypes) {
        dir = (0, path_1.join)(process.cwd(), dir);
        const listFiles = await (0, promises_1.readdir)(dir);
        fileTypes = fileTypes.map((extname) => extname[0] === '.' ? extname : '.' + extname);
        const jsonFiles = listFiles.filter((files) => fileTypes.includes((0, path_1.extname)(files)));
        return jsonFiles;
    }
};
exports.FileProvider = FileProvider = tslib_1.__decorate([
    (0, common_1.Injectable)()
], FileProvider);
