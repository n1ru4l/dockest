"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const dumpError_1 = __importDefault(require("../utils/dumpError"));
class BaseError extends Error {
    constructor(message, payload) {
        let errorMessage = `💥 ${message}`;
        if (payload) {
            errorMessage = `${errorMessage}\n${JSON.stringify(payload, null, 2)}`;
        }
        super(`${errorMessage}`);
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseError);
        }
        if (process.env.NODE_ENV !== constants_1.PROCESS_TEST_ENV && BaseError.DockestConfig.opts.dumpErrors === true) {
            dumpError_1.default({
                message: this.message,
                stack: this.stack,
                timestamp: new Date(),
                __configuration: BaseError.DockestConfig,
            });
        }
    }
}
exports.default = BaseError;
//# sourceMappingURL=BaseError.js.map