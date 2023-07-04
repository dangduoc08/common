"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let HTTPService = exports.HTTPService = class HTTPService {
    axiosService;
    constructor(axiosService) {
        this.axiosService = axiosService;
    }
    async download(url) {
        return await this.axiosService.axiosRef({
            url,
            responseType: 'arraybuffer'
        });
    }
};
exports.HTTPService = HTTPService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [axios_1.HttpService])
], HTTPService);
