import { ErrorPayload, ArrayAtLeastOne } from './@types';
import { JestConfig } from './onRun/runJest';
import { Runner } from './runners/@types';
import * as runners from './runners';
import execaWrapper from './utils/execaWrapper';
import sleep from './utils/sleep';
interface DefaultableUserConfig {
    afterSetupSleep: number;
    dev: {
        debug?: boolean;
    };
    dumpErrors: boolean;
    exitHandler: null | ((error: ErrorPayload) => any);
    logLevel: number;
    runInBand: boolean;
    composeFile: string | string[];
    guessRunnerType: boolean;
}
interface InternalConfig {
    failedTeardowns: {
        service: string;
        containerId: string;
    }[];
    jestRanWithResult: boolean;
    perfStart: number;
    isInsideDockerContainer: boolean;
    hostname: string;
}
export interface DockestConfig {
    runners: ArrayAtLeastOne<Runner>;
    opts: DefaultableUserConfig;
    jest: JestConfig;
    $: InternalConfig;
}
declare class Dockest {
    private config;
    constructor({ jest, opts }: {
        jest?: JestConfig;
        opts?: Partial<DefaultableUserConfig>;
    });
    attachRunners: (runners: ArrayAtLeastOne<Runner>) => void;
    run: () => Promise<void>;
    private validateConfig;
}
declare const logLevel: {
    NOTHING: number;
    ERROR: number;
    WARN: number;
    INFO: number;
    DEBUG: number;
};
export { sleep, runners, execaWrapper as execa, logLevel };
export default Dockest;
