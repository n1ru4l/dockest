"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../../Logger"));
const validateConfig_1 = __importDefault(require("../../utils/validateConfig"));
const validateTypes_1 = __importDefault(require("../../utils/validateTypes"));
const constants_1 = require("../constants");
const composeFileHelper_1 = require("../composeFileHelper");
const DEFAULT_PORT = 6379;
const DEFAULT_CONFIG = {
    ...constants_1.SHARED_DEFAULT_CONFIG_PROPS,
    password: '',
    ports: [
        {
            published: DEFAULT_PORT,
            target: DEFAULT_PORT,
        },
    ],
    responsivenessTimeout: constants_1.SHARED_DEFAULT_CONFIG_PROPS.responsivenessTimeout,
};
class RedisRunner {
    constructor(config) {
        this.containerId = '';
        this.initializer = '';
        this.isBridgeNetworkMode = false;
        this.getComposeService = () => composeFileHelper_1.defaultGetComposeService(this.runnerConfig);
        this.createResponsivenessCheckCmd = () => {
            const { host: runnerHost, password: runnerPassword } = this.runnerConfig;
            const containerId = this.containerId;
            // FIXME: Should `-p` really be DEFAULT_PORT or runnerConfig's port?
            const redisCliPingOpts = ` \
                            -h ${runnerHost} \
                            -p ${DEFAULT_PORT} \
                            ${!!runnerPassword ? `-a ${runnerPassword}` : ''} \
                            PING \
                          `;
            const command = ` \
                      docker exec ${containerId} redis-cli ${redisCliPingOpts} \
                    `;
            return command;
        };
        this.runnerConfig = {
            ...DEFAULT_CONFIG,
            ...config,
        };
        this.logger = new Logger_1.default(this);
    }
    mergeConfig({ ports, build, image, networks, ...composeService }) {
        this.runnerConfig = {
            ...this.runnerConfig,
            ...composeService,
            ...(image ? { image } : {}),
            ...(build ? { build } : {}),
            ...(ports ? { ports } : {}),
            ...(networks ? { networks: Object.keys(networks) } : {}),
        };
    }
    validateConfig() {
        const schema = {
            service: validateTypes_1.default.isString,
        };
        validateConfig_1.default(schema, this.runnerConfig);
    }
}
RedisRunner.DEFAULT_HOST = constants_1.SHARED_DEFAULT_CONFIG_PROPS.host;
RedisRunner.DEFAULT_PORT = DEFAULT_PORT;
exports.default = RedisRunner;
//# sourceMappingURL=index.js.map