"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_mock_proxy_1 = require("jest-mock-proxy");
const execa_1 = __importDefault(require("execa")); // eslint-disable-line import/default
const runners_1 = require("./runners");
const Logger_1 = __importDefault(require("./Logger"));
const constants_1 = require("./constants");
exports.mockedExecaStdout = 'getContainerId 🌮';
exports.runnerCommand = 'runRunnerCommands 🌮';
/**
 * FIXME: Would love for this to work 🦊
 */
// jest.mock('execa', () => jest.fn(() => ({ stdout: mockedExecaStdout })))
// jest.mock('./Logger')
const { values } = Object;
const createDockestConfig = (options) => {
    const { runners = [], opts = {}, realLoggers = false } = options;
    if (realLoggers === false) {
        for (const runner of runners) {
            runner.logger = jest_mock_proxy_1.createMockProxy();
        }
    }
    return {
        runners,
        opts: { ...constants_1.DEFAULT_USER_CONFIG, ...opts },
        jest: {},
        $: constants_1.INTERNAL_CONFIG,
    };
};
exports.default = ({ withRunnerCommands = false, realLoggers = false }) => {
    const withCmds = withRunnerCommands ? { commands: [exports.runnerCommand] } : {};
    const zooKeeperRunner = new runners_1.ZooKeeperRunner({
        service: 'zookeeper',
        image: 'zookeeper/image:123',
        ...withCmds,
    });
    const kafkaRunner = new runners_1.KafkaRunner({
        service: 'kafka',
        image: 'kafka/image:123',
        dependsOn: [zooKeeperRunner],
        ...withCmds,
    });
    const postgresRunner = new runners_1.PostgresRunner({
        service: 'postgres',
        image: 'postgres/image:123',
        database: '_',
        username: '_',
        password: '_',
        ...withCmds,
    });
    const redisRunner = new runners_1.RedisRunner({
        service: 'redis',
        image: 'redis/image:123',
        ...withCmds,
    });
    const generalPurposeRunner = new runners_1.GeneralPurposeRunner({
        service: 'general',
        image: 'general/image:123',
        ...withCmds,
    });
    const initializedRunners = {
        kafkaRunner,
        postgresRunner,
        redisRunner,
        zooKeeperRunner,
        generalPurposeRunner,
    };
    beforeEach(() => {
        if (realLoggers === false) {
            values(initializedRunners).forEach(runner => (runner.logger = jest_mock_proxy_1.createMockProxy()));
        }
    });
    return {
        initializedRunners,
        runners: {
            ZooKeeperRunner: runners_1.ZooKeeperRunner,
            KafkaRunner: runners_1.KafkaRunner,
            PostgresRunner: runners_1.PostgresRunner,
            RedisRunner: runners_1.RedisRunner,
            GeneralPurposeRunner: runners_1.GeneralPurposeRunner,
        },
        execa: execa_1.default,
        Logger: Logger_1.default,
        createDockestConfig,
    };
};
//# sourceMappingURL=testUtils.js.map