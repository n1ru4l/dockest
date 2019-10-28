"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DockestError_1 = __importDefault(require("../../errors/DockestError"));
const execaWrapper_1 = __importDefault(require("../../utils/execaWrapper"));
const sleep_1 = __importDefault(require("../../utils/sleep"));
const constants_1 = require("../../constants");
const getContainerId = async (runner) => {
    const { runnerConfig: { service }, } = runner;
    const command = ` \
                docker-compose \
                  -f ${constants_1.GENERATED_COMPOSE_FILE_PATH} \
                  ps \
                    -q \
                    "${service}"
              `;
    const containerId = await execaWrapper_1.default(command, runner);
    return containerId;
};
const testables = { getContainerId };
exports.testables = testables;
exports.default = async (runner) => {
    const { logger, runnerConfig: { service }, } = runner;
    const resolveContainerIdTimeout = 10;
    let containerId = '';
    const recurse = async (resolveContainerIdTimeout) => {
        logger.info('Resolving containerId');
        if (resolveContainerIdTimeout <= 0) {
            throw new DockestError_1.default(`${service}: Timed out (${resolveContainerIdTimeout}s) while trying to resolve containerId`);
        }
        try {
            containerId = await getContainerId(runner);
            if (typeof containerId !== 'string' || (typeof containerId === 'string' && containerId.length === 0)) {
                throw new Error(`Invalid containerId: ${containerId}`);
            }
            logger.info(`Resolved containerId: ${containerId}`);
        }
        catch (error) {
            resolveContainerIdTimeout--;
            await sleep_1.default(1000);
            await recurse(resolveContainerIdTimeout);
        }
        runner.containerId = containerId;
    };
    await recurse(resolveContainerIdTimeout);
};
//# sourceMappingURL=resolveContainerId.js.map