"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dockerComposeUp_1 = __importDefault(require("./dockerComposeUp"));
const runJest_1 = __importDefault(require("./runJest"));
const waitForRunnersReadiness_1 = __importDefault(require("./waitForRunnersReadiness"));
const createBridgeNetwork_1 = __importDefault(require("./createBridgeNetwork"));
const joinBridgeNetwork_1 = __importDefault(require("./joinBridgeNetwork"));
const removeBridgeNetwork_1 = __importDefault(require("./removeBridgeNetwork"));
const leaveBridgeNetwork_1 = __importDefault(require("./leaveBridgeNetwork"));
const createDockerEventEmitter_1 = require("./createDockerEventEmitter");
const createServiceDockerEventStream_1 = require("./createServiceDockerEventStream");
const createContainerStartCheck_1 = require("./createContainerStartCheck");
const Logger_1 = __importDefault(require("../Logger"));
const sleepForX_1 = __importDefault(require("../utils/sleepForX"));
const teardownSingle_1 = __importDefault(require("../utils/teardownSingle"));
const onRun = async (config) => {
    const { $: { perfStart, isInsideDockerContainer, hostname, dockerLogs }, $, opts: { afterSetupSleep, dev: { debug }, }, runners, } = config;
    const emitter = createDockerEventEmitter_1.createDockerEventEmitter(runners);
    const containerStartedTasks = runners.map(runner => createContainerStartCheck_1.createContainerStartCheck(runner, createServiceDockerEventStream_1.createServiceDockerEventStream(runner.runnerConfig.service, emitter)));
    const dockerComposeUpProcess = dockerComposeUp_1.default(runners.map(runner => runner.runnerConfig.service));
    $.dockerComposeUpProcess = dockerComposeUpProcess;
    if (dockerComposeUpProcess.stdout) {
        dockerComposeUpProcess.stdout.on('data', chunk => {
            dockerLogs.push(chunk.toString());
        });
    }
    if (dockerComposeUpProcess.stderr) {
        dockerComposeUpProcess.stderr.on('data', chunk => {
            dockerLogs.push(chunk.toString());
        });
    }
    if (isInsideDockerContainer) {
        await createBridgeNetwork_1.default();
        await joinBridgeNetwork_1.default(hostname, 'host.dockest-runner.internal');
    }
    // every single container should start
    await Promise.all(containerStartedTasks.map(task => task.done));
    await waitForRunnersReadiness_1.default(config);
    if (afterSetupSleep > 0) {
        await sleepForX_1.default('After setup sleep', afterSetupSleep);
    }
    if (debug || process.argv.includes('dev') || process.argv.includes('debug')) {
        Logger_1.default.info(`Debug mode enabled, containers are kept running and Jest will not run.`);
        config.runners.forEach((runner, index) => Logger_1.default.info(`[${index + 1}/${config.runners.length} | ${runner.runnerConfig.service}] ${JSON.stringify({
            service: runner.runnerConfig.service,
            containerId: runner.containerId,
            dependsOn: runner.runnerConfig.dependsOn,
        }, null, 2)}\n`));
        return; // Keep the docker containers running indefinitely
    }
    const allTestsPassed = await runJest_1.default(config);
    for (const runner of config.runners) {
        await teardownSingle_1.default(runner);
    }
    dockerComposeUpProcess.cancel();
    await dockerComposeUpProcess.catch(() => { });
    emitter.destroy();
    Logger_1.default.info('Docker Container Logs\n' + dockerLogs.join(''));
    if (isInsideDockerContainer) {
        await leaveBridgeNetwork_1.default(hostname);
        await removeBridgeNetwork_1.default();
    }
    Logger_1.default.perf(perfStart);
    allTestsPassed ? process.exit(0) : process.exit(1);
};
exports.default = onRun;
//# sourceMappingURL=index.js.map