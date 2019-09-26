"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_docker_1 = __importDefault(require("is-docker"));
const constants_1 = require("./constants");
const runners = __importStar(require("./runners"));
exports.runners = runners;
const BaseError_1 = __importDefault(require("./errors/BaseError"));
const ConfigurationError_1 = __importDefault(require("./errors/ConfigurationError"));
const execaWrapper_1 = __importDefault(require("./utils/execaWrapper"));
exports.execa = execaWrapper_1.default;
const onInstantiation_1 = __importDefault(require("./onInstantiation"));
const onRun_1 = __importDefault(require("./onRun"));
const sleep_1 = __importDefault(require("./utils/sleep"));
exports.sleep = sleep_1.default;
const validateTypes_1 = __importDefault(require("./utils/validateTypes"));
class Dockest {
    constructor({ jest = {}, opts = {} }) {
        this.attachRunners = (runners) => {
            this.config.runners = runners;
        };
        this.run = async () => {
            this.config.$.perfStart = Date.now();
            this.config.$.isInsideDockerContainer = is_docker_1.default();
            if (this.config.$.isInsideDockerContainer) {
                this.config.runners.forEach(runner => {
                    runner.isBridgeNetworkMode = true;
                    runner.runnerConfig.host = runner.runnerConfig.service;
                });
            }
            const { composeFileConfig } = onInstantiation_1.default(this.config);
            for (const runner of this.config.runners) {
                runner.mergeConfig(composeFileConfig.services[runner.runnerConfig.service]);
            }
            this.validateConfig();
            await onRun_1.default(this.config);
        };
        this.validateConfig = () => {
            const schema = {
                runners: validateTypes_1.default.isArray,
            };
            const failures = validateTypes_1.default(schema, this.config);
            if (failures.length > 0) {
                throw new ConfigurationError_1.default(`${failures.join('\n')}`);
            }
            if (this.config.runners.length <= 0) {
                throw new ConfigurationError_1.default('Missing runners');
            }
            // Validate service name uniqueness
            const serviceMap = {};
            for (const runner of this.config.runners) {
                runner.validateConfig();
                if (serviceMap[runner.runnerConfig.service]) {
                    throw new ConfigurationError_1.default(`Service property has to be unique. Collision found for runner with service "${runner.runnerConfig.service}"`);
                }
                serviceMap[runner.runnerConfig.service] = runner.runnerConfig.service;
            }
        };
        this.config = {
            jest,
            runners: [],
            opts: { ...constants_1.DEFAULT_USER_CONFIG, ...opts },
            $: { ...constants_1.INTERNAL_CONFIG },
        };
        BaseError_1.default.DockestConfig = this.config;
    }
}
const logLevel = constants_1.LOG_LEVEL;
exports.logLevel = logLevel;
exports.default = Dockest;
//# sourceMappingURL=index.js.map