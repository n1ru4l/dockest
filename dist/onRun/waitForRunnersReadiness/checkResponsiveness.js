"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DockestError_1 = __importDefault(require("../../errors/DockestError"));
const execaWrapper_1 = __importDefault(require("../../utils/execaWrapper"));
const sleep_1 = __importDefault(require("../../utils/sleep"));
// FIXME: Fix type errors
const checkResponsiveness = async (runner) => {
    const { 
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    runnerConfig: { responsivenessTimeout }, logger, 
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    createResponsivenessCheckCmd, } = runner;
    if (!responsivenessTimeout || !createResponsivenessCheckCmd) {
        return Promise.resolve();
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const responsivenessCheckCmd = runner.createResponsivenessCheckCmd();
    const recurse = async (responsivenessTimeout, runner) => {
        // TODO: Try getting replacePrevLine in here
        logger.debug(`Checking responsiveness (Timeout in: ${responsivenessTimeout}s)`);
        if (responsivenessTimeout <= 0) {
            throw new DockestError_1.default(`Responsiveness timed out`);
        }
        try {
            await execaWrapper_1.default(responsivenessCheckCmd, runner);
            logger.debug(`Checked responsiveness successfully`);
        }
        catch (error) {
            responsivenessTimeout--;
            await sleep_1.default(1000);
            await recurse(responsivenessTimeout, runner);
        }
    };
    await recurse(responsivenessTimeout, runner);
};
exports.default = checkResponsiveness;
//# sourceMappingURL=checkResponsiveness.js.map