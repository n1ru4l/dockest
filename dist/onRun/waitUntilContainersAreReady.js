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
const waitUntilContainersAreReady = async (services) => {
    const command = ` \
              docker-compose \
              -f ${constants_1.GENERATED_COMPOSE_FILE_PATH} \
              events \
              --json  \
              ${services.map(service => service.runnerConfig.service).join(' ')} \
            `;
    const childProcess = execa_1.default(command, { shell: true, reject: false });
    if (!childProcess.stdout) {
        childProcess.kill();
        throw new Error('Event Process has not output stream.');
    }
    const emitter = new events_1.default();
    childProcess.stdout.addListener('data', chunk => {
        const string = chunk.toString();
        const data = parseJsonSafe(string);
        if (!data)
            return;
        emitter.emit(data.service, data);
    });
    await Promise.all(services.map(service => new Promise(resolve => {
        let interval = setInterval(() => {
            service.logger.info('Still waiting for start event...');
        }, 10000);
        service.logger.info('Waiting for start event.');
        const eventListener = (ev) => {
            if (ev.action === 'start') {
                service.logger.info('Received start event.');
                emitter.removeListener(service.runnerConfig.service, eventListener);
                clearInterval(interval);
                resolve();
            }
        };
        emitter.addListener(service.runnerConfig.service, eventListener);
    })));
    childProcess.cancel();
    await childProcess;
};
exports.default = waitUntilContainersAreReady;
//# sourceMappingURL=waitUntilContainersAreReady.js.map