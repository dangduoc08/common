"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const http_provider_1 = require("./http.provider");
const services_1 = require("./services");
let HTTPModule = exports.HTTPModule = class HTTPModule {
};
exports.HTTPModule = HTTPModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [http_provider_1.HTTPProvider, services_1.HTTPService],
        exports: [http_provider_1.HTTPProvider, services_1.HTTPService]
    })
], HTTPModule);
