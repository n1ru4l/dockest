"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa_1 = __importDefault(require("execa")); // eslint-disable-line import/default
const trim_1 = __importDefault(require("./trim"));
const Logger_1 = __importDefault(require("../Logger"));
const execaWrapper = async (command, runner) => {
    const trimmedCommand = trim_1.default(command);
    const logger = runner ? runner.logger : Logger_1.default;
    logger.debug(`Executing shell script: ${trimmedCommand}`);
    const { stdout } = await execa_1.default(trimmedCommand, { shell: true });
    logger.debug(`Successfully executed shell script ${trimmedCommand}`);
    return stdout;
};
exports.default = execaWrapper;
//# sourceMappingURL=execaWrapper.js.map