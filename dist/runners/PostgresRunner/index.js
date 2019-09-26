"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const Logger_1 = __importDefault(require("../../Logger"));
const validateConfig_1 = __importDefault(require("../../utils/validateConfig"));
const validateTypes_1 = __importDefault(require("../../utils/validateTypes"));
const composeFileHelper_1 = __importDefault(require("../composeFileHelper"));
const DEFAULT_PORT = 5432;
const DEFAULT_CONFIG = {
    ...constants_1.SHARED_DEFAULT_CONFIG_PROPS,
    ports: [
        {
            target: DEFAULT_PORT,
            published: DEFAULT_PORT,
        },
    ],
    responsivenessTimeout: constants_1.SHARED_DEFAULT_CONFIG_PROPS.responsivenessTimeout,
};
class PostgresRunner {
    constructor(configUserInput) {
        this.containerId = '';
        this.initializer = '';
        this.isBridgeNetworkMode = false;
        this.getComposeService = () => {
            const { database, password, username } = this.runnerConfig;
            return {
                environment: {
                    [PostgresRunner.ENVIRONMENT_DATABASE]: database,
                    [PostgresRunner.ENVIRONMENT_PASSWORD]: password,
                    [PostgresRunner.ENVIRONMENT_USERNAME]: username,
                },
                ...composeFileHelper_1.default(this.runnerConfig),
            };
        };
        this.createResponsivenessCheckCmd = () => {
            const { host, database, username } = this.runnerConfig;
            const containerId = this.containerId;
            const command = ` \
                      docker exec ${containerId} \
                      bash -c "psql \
                      -h ${host} \
                      -d ${database} \
                      -U ${username} \
                      -c 'select 1'" \
                    `;
            return command;
        };
        this.runnerConfig = {
            ...DEFAULT_CONFIG,
            ...configUserInput,
        };
        this.logger = new Logger_1.default(this);
    }
    mergeConfig({ ports, build, image, networks, ...composeService }) {
        this.runnerConfig = {
            ...this.runnerConfig,
            ...composeService,
            ...(image ? { image } : {}),
            ...(ports ? { ports } : {}),
            ...(networks ? { networks: Object.keys(networks) } : {}),
        };
    }
    validateConfig() {
        // TODO: Can this type be generalized and receive RequiredConfigProps as an argument?
        const schema = {
            database: validateTypes_1.default.isString,
            password: validateTypes_1.default.isString,
            service: validateTypes_1.default.isString,
            username: validateTypes_1.default.isString,
        };
        validateConfig_1.default(schema, this.runnerConfig);
    }
}
PostgresRunner.DEFAULT_HOST = constants_1.SHARED_DEFAULT_CONFIG_PROPS.host;
PostgresRunner.DEFAULT_PORT = DEFAULT_PORT;
PostgresRunner.ENVIRONMENT_DATABASE = 'POSTGRES_DB';
PostgresRunner.ENVIRONMENT_PASSWORD = 'POSTGRES_PASSWORD';
PostgresRunner.ENVIRONMENT_USERNAME = 'POSTGRES_USER';
exports.default = PostgresRunner;
//# sourceMappingURL=index.js.map