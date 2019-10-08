"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../Logger"));
exports.default = (config) => {
    Logger_1.default.logLevel = config.opts.logLevel;
};
//# sourceMappingURL=setLogLevel.js.map