"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execaWrapper_1 = __importDefault(require("./execaWrapper"));
const stopContainerById = async (runner) => {
    const { containerId, logger } = runner;
    logger.debug('Container being stopped');
    try {
        const command = `docker stop ${containerId}`;
        await execaWrapper_1.default(command, runner);
    }
    catch (error) {
        return logger.error('Unexpected error when stopping container', { error });
    }
    logger.debug('Container stopped');
};
const removeContainerById = async (runner) => {
    const { containerId, logger } = runner;
    logger.debug('Container being removed');
    try {
        const command = `docker rm ${containerId} --volumes`;
        await execaWrapper_1.default(command, runner);
    }
    catch (error) {
        return logger.error('Unexpected error when removing container', { error });
    }
    logger.debug('Container removed');
};
exports.default = async (runner) => {
    const { containerId, logger } = runner;
    if (!containerId) {
        return logger.error('Cannot teardown container without a containerId');
    }
    // Teardown runner's dependencies
    for (const depRunner of runner.runnerConfig.dependsOn) {
        const { logger } = depRunner;
        logger.info('Container teardown started');
        await stopContainerById(depRunner);
        await removeContainerById(depRunner);
        logger.info('Container teardown completed', { nl: 1 });
    }
    // Teardown runner
    logger.info('Container teardown started');
    await stopContainerById(runner);
    await removeContainerById(runner);
    logger.info('Container teardown completed', { nl: 1 });
};
//# sourceMappingURL=teardownSingle.js.map