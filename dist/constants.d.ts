export declare const COLORS: {
    MISC: {
        BLINK: string;
        BRIGHT: string;
        DIM: string;
        HIDDEN: string;
        RESET: string;
        REVERSE: string;
        UNDERSCORE: string;
    };
    FG: {
        BLACK: string;
        BLUE: string;
        CYAN: string;
        GREEN: string;
        MAGENTA: string;
        RED: string;
        WHITE: string;
        YELLOW: string;
    };
    BG: {
        BLACK: string;
        BLUE: string;
        CYAN: string;
        GREEN: string;
        MAGENTA: string;
        RED: string;
        WHITE: string;
        YELLOW: string;
    };
};
export declare const LOG_SYMBOLS: readonly string[];
export declare const LOG_LEVEL: {
    NOTHING: number;
    ERROR: number;
    WARN: number;
    INFO: number;
    DEBUG: number;
};
export declare const DEFAULT_USER_CONFIG: {
    afterSetupSleep: number;
    composeFile: never[];
    dev: {
        debug: boolean;
    };
    dumpErrors: boolean;
    exitHandler: null;
    guessRunnerType: boolean;
    logLevel: number;
    runInBand: boolean;
};
export declare const INTERNAL_CONFIG: {
    failedTeardowns: never[];
    hostname: string;
    isInsideDockerContainer: boolean;
    jestRanWithResult: boolean;
    perfStart: number;
    dockerLogs: never[];
};
export declare const PROCESS_TEST_ENV = "dockest-test";
export declare const GENERATED_COMPOSE_FILE_NAME = "docker-compose.dockest-generated.yml";
export declare const GENERATED_RUNNER_COMPOSE_FILE_NAME = "docker-compose.dockest-generated-runner.yml";
export declare const GENERATED_COMPOSE_FILE_PATH: string;
export declare const GENERATED_RUNNER_COMPOSE_FILE_PATH: string;
export declare const BRIDGE_NETWORK_NAME = "dockest_bridge_network";
