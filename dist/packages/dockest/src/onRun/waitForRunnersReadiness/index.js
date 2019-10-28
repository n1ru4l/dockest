"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkConnection_1 = __importDefault(require("./checkConnection"));
const checkResponsiveness_1 = __importDefault(require("./checkResponsiveness"));
const resolveContainerId_1 = __importDefault(require("./resolveContainerId"));
const runRunnerCommands_1 = __importDefault(require("./runRunnerCommands"));
const fixRunnerHostAccessOnLinux_1 = __importDefault(require("./fixRunnerHostAccessOnLinux"));
const joinBridgeNetwork_1 = __importDefault(require("../joinBridgeNetwork"));
const setupRunner = async (runner, initializer) => {
    runner.logger.info('Setup initiated');
    await resolveContainerId_1.default(runner);
    if (runner.isBridgeNetworkMode) {
        await joinBridgeNetwork_1.default(runner.containerId, runner.runnerConfig.service);
    }
    if (process.platform === 'linux' && !runner.isBridgeNetworkMode) {
        await fixRunnerHostAccessOnLinux_1.default(runner);
    }
    await checkConnection_1.default(runner);
    await checkResponsiveness_1.default(runner);
    await runRunnerCommands_1.default(runner);
    runner.initializer = initializer;
    runner.logger.info('Setup successful', { nl: 1 });
};
const setupIfNotOngoing = async (runner, initializer) => {
    if (!!runner.initializer) {
        runner.logger.info(`"${runner.runnerConfig.service}" has already been setup by "${runner.initializer}" - skipping`, { nl: 1 });
    }
    else {
        await setupRunner(runner, initializer);
    }
};
const setupRunnerWithDependencies = async (runner) => {
    // Setup runner's dependencies
    for (const depRunner of runner.runnerConfig.dependsOn) {
        await setupIfNotOngoing(depRunner, runner.runnerConfig.service);
    }
    await setupIfNotOngoing(runner, runner.runnerConfig.service);
};
exports.default = async (config) => {
    const setupPromises = [];
    for (const runner of config.runners) {
        if (!!config.opts.runInBand) {
            await setupRunnerWithDependencies(runner);
        }
        else {
            setupPromises.push(setupRunnerWithDependencies(runner));
        }
    }
    await Promise.all(setupPromises);
};
//# sourceMappingURL=index.js.map