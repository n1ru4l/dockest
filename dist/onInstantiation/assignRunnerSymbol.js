"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const hashCode_1 = __importDefault(require("../utils/hashCode"));
exports.default = (config) => {
    let LOG_SYMBOLS_CLONE = constants_1.LOG_SYMBOLS.slice(0);
    config.runners.forEach(({ logger, runnerConfig: { service } }) => {
        const serviceHash = Math.abs(hashCode_1.default(service));
        if (LOG_SYMBOLS_CLONE.length === 0) {
            LOG_SYMBOLS_CLONE = constants_1.LOG_SYMBOLS.slice(0);
        }
        const index = serviceHash % LOG_SYMBOLS_CLONE.length;
        const LOG_SYMBOL = LOG_SYMBOLS_CLONE.splice(index, 1)[0];
        logger.setRunnerSymbol(LOG_SYMBOL);
    });
};
//# sourceMappingURL=assignRunnerSymbol.js.map