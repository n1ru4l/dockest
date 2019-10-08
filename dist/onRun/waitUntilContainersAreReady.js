"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa_1 = __importDefault(require("execa")); /* eslint-disable-line import/default */
const constants_1 = require("../constants");
const events_1 = __importDefault(require("events"));
const parseJsonSafe = (data) => {
    try {
        return JSON.parse(data);
    }
    catch (err) {
        return null;
    }
};
exports.createDockerEventEmitter = (services) => {
    const command = ` \
              docker-compose \
              -f ${constants_1.GENERATED_COMPOSE_FILE_PATH} \
              events \
              --json  \
              ${services.map(service => service.runnerConfig.service).join(' ')}
            `;
    const childProcess = execa_1.default(command, { shell: true, reject: false });
    if (!childProcess.stdout) {
        childProcess.kill();
        throw new Error('Event Process has not output stream.');
    }
    const emitter = new events_1.default();
    // without this line only the first data event is fired (in some undefinable cases)
    childProcess.then(() => { });
    childProcess.stdout.addListener('data', chunk => {
        const lines = chunk
            .toString()
            .split(`\n`)
            .filter(Boolean);
        for (const line of lines) {
            const data = parseJsonSafe(line);
            if (!data)
                return;
            emitter.emit(data.service, data);
        }
    });
    return {
        emitter,
        destroyEmitter: async () => {
            childProcess.cancel();
        },
    };
};
exports.createContainerReadinessCheck = (emitter, service) => {
    let resolve = () => { };
    const interval = setInterval(() => {
        service.logger.info('Still waiting for start event...');
    }, 10000);
    const listener = (ev) => {
        if (ev.action === 'start' || ev.action === 'attach') {
            clearInterval(interval);
            emitter.removeListener(service.runnerConfig.service, listener);
            service.logger.info('Received start event.');
            resolve();
        }
    };
    emitter.addListener(service.runnerConfig.service, listener);
    service.logger.info('Waiting for start event.');
    return new Promise(_resolve => (resolve = _resolve));
};
//# sourceMappingURL=waitUntilContainersAreReady.js.map