import { BaseRunner, GetComposeService, SharedDefaultableConfigProps, SharedRequiredConfigProps, ComposeService } from '../@types';
import Logger from '../../Logger';
interface RequiredConfigProps extends SharedRequiredConfigProps {
    service: string;
}
interface DefaultableConfigProps extends SharedDefaultableConfigProps {
}
interface ZooKeeperRunnerConfig extends RequiredConfigProps, DefaultableConfigProps {
}
declare class ZooKeeperRunner implements BaseRunner {
    static DEFAULT_HOST: string;
    static DEFAULT_PORT: number;
    containerId: string;
    initializer: string;
    runnerConfig: ZooKeeperRunnerConfig;
    logger: Logger;
    isBridgeNetworkMode: boolean;
    constructor(config: RequiredConfigProps & Partial<DefaultableConfigProps>);
    mergeConfig({ ports, build, image, networks, ...composeService }: ComposeService): void;
    validateConfig(): void;
    getComposeService: GetComposeService;
}
export { ZooKeeperRunnerConfig };
export default ZooKeeperRunner;
