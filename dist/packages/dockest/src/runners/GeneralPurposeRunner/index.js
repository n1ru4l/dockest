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
const DEFAULT_CONFIG = {
    ...constants_1.SHARED_DEFAULT_CONFIG_PROPS,
};
class GeneralPurposeRunner {
    constructor(config) {
        this.containerId = '';
        this.initializer = '';
        this.createResponsivenessCheckCmd = null;
        this.isBridgeNetworkMode = false;
        this.getComposeService = () => composeFileHelper_1.defaultGetComposeService(this.runnerConfig);
        this.runnerConfig = {
            ...DEFAULT_CONFIG,
            ...config,
        };
        if (this.runnerConfig.getResponsivenessCheckCommand) {
            this.createResponsivenessCheckCmd = () => {
                if (!this.runnerConfig.getResponsivenessCheckCommand) {
                    throw new Error('Invalid state');
                }
                const command = this.runnerConfig.getResponsivenessCheckCommand(this.containerId);
                return command;
            };
        }
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
exports.default = GeneralPurposeRunner;
//# sourceMappingURL=index.js.map