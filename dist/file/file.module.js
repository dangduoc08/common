"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const file_provider_1 = require("./file.provider");
let FileModule = exports.FileModule = class FileModule {
};
exports.FileModule = FileModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [file_provider_1.FileProvider],
        exports: [file_provider_1.FileProvider]
    })
], FileModule);
