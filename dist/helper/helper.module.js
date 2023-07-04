"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const helper_service_1 = require("./helper.service");
let HelperModule = exports.HelperModule = class HelperModule {
};
exports.HelperModule = HelperModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [helper_service_1.HelperService],
        exports: [helper_service_1.HelperService]
    })
], HelperModule);
