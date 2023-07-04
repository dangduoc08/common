"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPProvider = void 0;
const tslib_1 = require("tslib");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const sharp_1 = tslib_1.__importDefault(require("sharp"));
const services_1 = require("./services");
let HTTPProvider = exports.HTTPProvider = class HTTPProvider {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async saveImageAsWebp(url, dir, imgName) {
        const downloadResponse = await this.httpService.download(url);
        dir = (0, path_1.join)(process.cwd(), dir);
        imgName = imgName.replace((0, path_1.extname)(imgName), '') + '.webp';
        const webpPath = dir + '/' + imgName;
        (0, sharp_1.default)(downloadResponse.data).webp().toFile(webpPath);
        return webpPath;
    }
};
exports.HTTPProvider = HTTPProvider = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [services_1.HTTPService])
], HTTPProvider);
