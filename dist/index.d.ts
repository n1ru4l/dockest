import { ExecaChildProcess } from 'execa';
import { ErrorPayload, ArrayAtLeastOne } from './@types';
import { JestConfig } from './onRun/runJest';
import { Runner } from './runners/@types';
import * as runners from './runners';
import execaWrapper from './utils/execaWrapper';
import sleep from './utils/sleep';
interface DefaultableUserConfig {
    afterSetupSleep: number;
    composeFile: string | string[];
    dev: {
        debug?: boolean;
    };
    dumpErrors: boolean;
    exitHandler: null | ((error: ErrorPayload) => any);
    guessRunnerType: boolean;
    logLevel: number;
    runInBand: boolean;
}
interface InternalConfig {
    failedTeardowns: {
        service: string;
        containerId: string;
    }[];
    hostname: string;
    isInsideDockerContainer: boolean;
    jestRanWithResult: boolean;
    perfStart: number;
    dockerLogs: string[];
    dockerComposeUpProcess?: ExecaChildProcess;
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
