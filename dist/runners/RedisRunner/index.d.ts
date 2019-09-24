import Logger from '../../Logger';
import { BaseRunner, GetComposeService, SharedRequiredConfigProps, SharedDefaultableConfigProps } from '../@types';
interface RequiredConfigProps extends SharedRequiredConfigProps {
}
interface DefaultableConfigProps extends SharedDefaultableConfigProps {
    password: string;
    responsivenessTimeout: number;
}
interface RedisRunnerConfig extends RequiredConfigProps, DefaultableConfigProps {
}
declare class RedisRunner implements BaseRunner {
    static DEFAULT_HOST: string | ((containerId: string) => string);
    static DEFAULT_PORT: string;
    containerId: string;
    initializer: string;
    runnerConfig: RedisRunnerConfig;
    logger: Logger;
    constructor(config: RequiredConfigProps & Partial<DefaultableConfigProps>);
    validateConfig(): void;
    getComposeService: GetComposeService;
    createResponsivenessCheckCmd: () => string;
}
export { RedisRunnerConfig };
export default RedisRunner;
