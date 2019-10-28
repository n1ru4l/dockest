import { BaseRunnerInterface, GetComposeService, SharedConfigProps, ComposeService } from './@types';
import Logger from '../Logger';
import { ReadinessCheck } from '../readiness-check/@types';
export declare abstract class AbstractRunner<TRunnerConfig extends SharedConfigProps> implements BaseRunnerInterface {
    private _containerId?;
    logger: Logger;
    runnerConfig: TRunnerConfig;
    readinessChecks: Array<ReadinessCheck>;
    initializer: string;
    isBridgeNetworkMode: boolean;
    constructor(configUserInput: TRunnerConfig);
    getComposeService: GetComposeService;
    validateConfig(): void;
    mergeConfig({ ports, build, image, networks, ...composeService }: ComposeService): void;
    setup(): void;
    containerId: string;
}
