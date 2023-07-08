"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const utils_1 = require("./utils");
let HelperService = exports.HelperService = class HelperService {
    select(utilType) {
        switch (utilType) {
            case 'query':
                return utils_1.Query.getInstance();
            case 'object':
                return utils_1.ObjectData.getInstance();
            default:
                return undefined;
        }
    }
};
exports.HelperService = HelperService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], HelperService);
