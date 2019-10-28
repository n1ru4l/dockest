"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const ConfigurationError_1 = __importDefault(require("../../errors/ConfigurationError"));
const Logger_1 = __importDefault(require("../../Logger"));
const validateConfig_1 = __importDefault(require("../../utils/validateConfig"));
const validateTypes_1 = __importDefault(require("../../utils/validateTypes"));
const composeFileHelper_1 = __importDefault(require("../composeFileHelper"));
const DEFAULT_PORT = 2181;
const DEFAULT_CONFIG = {
    ...constants_1.SHARED_DEFAULT_CONFIG_PROPS,
    ports: [
        {
            published: DEFAULT_PORT,
            target: DEFAULT_PORT,
        },
    ],
};
class ZooKeeperRunner {
    constructor(config) {
        this.containerId = '';
        this.initializer = '';
        this.isBridgeNetworkMode = false;
        this.getComposeService = () => {
            const { ports } = this.runnerConfig;
            const zookeeperClientPortBinding = ports.find(portBinding => portBinding.target === DEFAULT_PORT);
            if (!zookeeperClientPortBinding) {
                throw new ConfigurationError_1.default(`Could not resolve required environment variable ZOOKEEPER_CLIENT_PORT. Expected ${DEFAULT_PORT} to appear as value in ports object`);
            }
            return {
                environment: {
                    ZOOKEEPER_CLIENT_PORT: zookeeperClientPortBinding.target,
                },
                ...composeFileHelper_1.default(this.runnerConfig),
            };
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
ZooKeeperRunner.DEFAULT_HOST = constants_1.SHARED_DEFAULT_CONFIG_PROPS.host;
ZooKeeperRunner.DEFAULT_PORT = DEFAULT_PORT;
exports.default = ZooKeeperRunner;
//# sourceMappingURL=index.js.map