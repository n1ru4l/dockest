"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dumpError_1 = __importDefault(require("../utils/dumpError"));
const Logger_1 = __importDefault(require("../Logger"));
const teardownSingle_1 = __importDefault(require("../utils/teardownSingle"));
exports.default = async (config) => {
    const { $: { perfStart }, opts: { exitHandler: customExitHandler }, runners, } = config;
    let exitInProgress = false;
    const exitHandler = async (errorPayload) => {
        if (exitInProgress) {
            return;
        }
        exitInProgress = true;
        if (config.$.jestRanWithResult) {
            return;
        }
        Logger_1.default.error(`💥 Exithandler invoked: ${JSON.stringify(errorPayload, null, 2)}`);
        if (customExitHandler && typeof customExitHandler === 'function') {
            const error = errorPayload || new Error('Failed to extract error');
            customExitHandler(error);
        }
        for (const runner of runners) {
            await teardownSingle_1.default(runner);
        }
        if (config.opts.dumpErrors === true) {
            dumpError_1.default({
                errorPayload,
                timestamp: new Date(),
                __configuration: config,
            });
        }
        Logger_1.default.perf(perfStart);
        process.exit(errorPayload.code || 1);
    };
    // so the program will not close instantly
    process.stdin.resume(); // FIXME: causes "Jest has detected the following 1 open handle potentially keeping Jest from exiting:"
    // do something when app is closing
    process.on('exit', async (code) => exitHandler({ trap: 'exit', code }));
    // catches ctrl+c event
    process.on('SIGINT', async (signal) => exitHandler({ trap: 'SIGINT', signal }));
    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', async () => exitHandler({ trap: 'SIGUSR1' }));
    process.on('SIGUSR2', async () => exitHandler({ trap: 'SIGUSR2' }));
    // catches uncaught exceptions
    process.on('uncaughtException', async (error) => exitHandler({ trap: 'uncaughtException', error }));
    // catches unhandled promise rejections
    process.on('unhandledRejection', async (reason, promise) => exitHandler({ trap: 'unhandledRejection', reason, promise }));
};
//# sourceMappingURL=setupExitHandler.js.map