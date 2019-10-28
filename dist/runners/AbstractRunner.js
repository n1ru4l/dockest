"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const composeFileHelper_1 = require("./composeFileHelper");
const constants_1 = require("./constants");
const Logger_1 = __importDefault(require("../Logger"));
class AbstractRunner {
    constructor(configUserInput) {
        this.readinessChecks = [];
        this.initializer = '';
        this.isBridgeNetworkMode = false;
        this.getComposeService = () => composeFileHelper_1.defaultGetComposeService(this.runnerConfig);
        this.runnerConfig = {
            ...constants_1.SHARED_DEFAULT_CONFIG_PROPS,
            ...configUserInput,
        };
        this.logger = new Logger_1.default(this.runnerConfig.service);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    validateConfig() { }
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setup() { }
    get containerId() {
        if (!this._containerId) {
            throw new Error('Cannot access containerId. Not set yet.');
        }
        return this._containerId;
    }
    set containerId(id) {
        this._containerId = id;
    }
}
exports.AbstractRunner = AbstractRunner;
//# sourceMappingURL=AbstractRunner.js.map