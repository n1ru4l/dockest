"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const execa_1 = __importDefault(require("execa")); /* eslint-disable-line import/default */
const constants_1 = require("../constants");
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
    // @TODO: without this line only the first data event is fired (in some undefinable cases)
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
            // convert health status to friendlier format
            if (data.action.startsWith('health_status: ')) {
                const healthStatus = data.action
                    .replace('health_status: ', '')
                    .trim();
                data.action = 'health_status';
                data.attributes.healthStatus = healthStatus;
            }
            emitter.emit(data.service, data);
        }
    });
    return Object.assign(emitter, {
        destroy: () => childProcess.cancel(),
    });
};
//# sourceMappingURL=createDockerEventEmitter.js.map