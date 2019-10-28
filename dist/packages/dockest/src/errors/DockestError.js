"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("./BaseError"));
class DockestError extends BaseError_1.default {
    constructor(message, payload) {
        super(message, payload);
        this.name = 'DockestError';
    }
}
exports.default = DockestError;
//# sourceMappingURL=DockestError.js.map