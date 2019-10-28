"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLORS = {
    MISC: {
        BLINK: '\x1b[5m',
        BRIGHT: '\x1b[1m',
        DIM: '\x1b[2m',
        HIDDEN: '\x1b[8m',
        RESET: '\x1b[0m',
        REVERSE: '\x1b[7m',
        UNDERSCORE: '\x1b[4m',
    },
    FG: {
        BLACK: '\x1b[30m',
        BLUE: '\x1b[34m',
        CYAN: '\x1b[36m',
        GREEN: '\x1b[32m',
        MAGENTA: '\x1b[35m',
        RED: '\x1b[31m',
        WHITE: '\x1b[37m',
        YELLOW: '\x1b[33m',
    },
    BG: {
        BLACK: '\x1b[40m',
        BLUE: '\x1b[44m',
        CYAN: '\x1b[46m',
        GREEN: '\x1b[42m',
        MAGENTA: '\x1b[45m',
        RED: '\x1b[41m',
        WHITE: '\x1b[47m',
        YELLOW: '\x1b[43m',
    },
};
exports.LOG_SYMBOLS = [
    '🐉 ',
    '🐒 ',
    '🐙 ',
    '🐞 ',
    '🐥 ',
    '🐼 ',
    '🐿 ',
    '🦂 ',
    '🦃 ',
    '🦄 ',
    '🦊 ',
    '🦋 ',
    '🦍 ',
    '🦖 ',
    '🦚 ',
];
exports.LOG_LEVEL = {
    NOTHING: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4,
};
exports.DEFAULT_USER_CONFIG = {
    afterSetupSleep: 0,
    dev: { debug: false },
    dumpErrors: false,
    exitHandler: null,
    logLevel: exports.LOG_LEVEL.INFO,
    runInBand: true,
    composeFile: [],
    guessRunnerType: false,
};
exports.INTERNAL_CONFIG = {
    failedTeardowns: [],
    jestRanWithResult: false,
    perfStart: 0,
    isInsideDockerContainer: false,
    hostname: process.env.HOSTNAME || 'host.docker.internal',
};
exports.PROCESS_TEST_ENV = 'dockest-test';
exports.GENERATED_COMPOSE_FILE_NAME = 'docker-compose.dockest-generated.yml';
exports.GENERATED_RUNNER_COMPOSE_FILE_NAME = 'docker-compose.dockest-generated-runner.yml';
exports.GENERATED_COMPOSE_FILE_PATH = `${process.cwd()}/${exports.GENERATED_COMPOSE_FILE_NAME}`;
exports.GENERATED_RUNNER_COMPOSE_FILE_PATH = `${process.cwd()}/${exports.GENERATED_RUNNER_COMPOSE_FILE_NAME}`;
exports.BRIDGE_NETWORK_NAME = `dockest_bridge_network`;
//# sourceMappingURL=constants.js.map