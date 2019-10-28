import Logger from '../../Logger';
import { BaseRunner, GetComposeService, SharedRequiredConfigProps, SharedDefaultableConfigProps, ComposeService } from '../@types';
interface RequiredConfigProps extends SharedRequiredConfigProps {
}
interface DefaultableConfigProps extends SharedDefaultableConfigProps {
    password: string;
    responsivenessTimeout: number;
}
interface RedisRunnerConfig extends RequiredConfigProps, DefaultableConfigProps {
}
declare class RedisRunner implements BaseRunner {
    static DEFAULT_HOST: string;
    static DEFAULT_PORT: number;
    containerId: string;
    initializer: string;
    runnerConfig: RedisRunnerConfig;
    logger: Logger;
    isBridgeNetworkMode: boolean;
    constructor(config: RequiredConfigProps & Partial<DefaultableConfigProps>);
    mergeConfig({ ports, build, image, networks, ...composeService }: ComposeService): void;
    validateConfig(): void;
    getComposeService: GetComposeService;
    createResponsivenessCheckCmd: () => string;
}
export { RedisRunnerConfig };
export default RedisRunner;
