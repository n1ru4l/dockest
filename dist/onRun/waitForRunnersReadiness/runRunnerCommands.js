"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa_1 = __importDefault(require("execa")); // eslint-disable-line import/default
exports.default = async (runner) => {
    const { runnerConfig: { commands = [] }, logger, } = runner;
    for (const command of commands) {
        logger.debug(`Executed custom command: ${command}`);
        const { stdout: result } = await execa_1.default(command, { shell: true });
        logger.debug(`Executed custom command successfully with result: ${result}`, { nl: 1 });
    }
};
//# sourceMappingURL=runRunnerCommands.js.map