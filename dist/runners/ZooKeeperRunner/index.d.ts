import { BaseRunner, GetComposeService, SharedDefaultableConfigProps, SharedRequiredConfigProps } from '../@types';
import Logger from '../../Logger';
interface RequiredConfigProps extends SharedRequiredConfigProps {
    service: string;
}
interface DefaultableConfigProps extends SharedDefaultableConfigProps {
}
interface ZooKeeperRunnerConfig extends RequiredConfigProps, DefaultableConfigProps {
}
declare class ZooKeeperRunner implements BaseRunner {
    static DEFAULT_HOST: string | ((containerId: string) => string);
    static DEFAULT_PORT: string;
    containerId: string;
    initializer: string;
    runnerConfig: ZooKeeperRunnerConfig;
    logger: Logger;
    constructor(config: RequiredConfigProps & Partial<DefaultableConfigProps>);
    validateConfig(): void;
    getComposeService: GetComposeService;
}
export { ZooKeeperRunnerConfig };
export default ZooKeeperRunner;
