"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const http_provider_1 = require("./http.provider");
const services_1 = require("./services");
let HttpModule = exports.HttpModule = class HttpModule {
};
exports.HttpModule = HttpModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [http_provider_1.HttpProvider, services_1.HttpService],
        exports: [http_provider_1.HttpProvider, services_1.HttpService]
    })
], HttpModule);
