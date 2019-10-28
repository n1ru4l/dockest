import { BaseRunner, GetComposeService, SharedDefaultableConfigProps, SharedRequiredConfigProps, ComposeService } from '../@types';
import Logger from '../../Logger';
interface RequiredConfigProps extends SharedRequiredConfigProps {
    database: string;
    password: string;
    username: string;
}
interface DefaultableConfigProps extends SharedDefaultableConfigProps {
    responsivenessTimeout: number;
}
interface PostgresRunnerConfig extends RequiredConfigProps, DefaultableConfigProps {
}
declare class PostgresRunner implements BaseRunner {
    static DEFAULT_HOST: string;
    static DEFAULT_PORT: number;
    static ENVIRONMENT_DATABASE: string;
    static ENVIRONMENT_PASSWORD: string;
    static ENVIRONMENT_USERNAME: string;
    containerId: string;
    initializer: string;
    runnerConfig: PostgresRunnerConfig;
    logger: Logger;
    isBridgeNetworkMode: boolean;
    constructor(configUserInput: RequiredConfigProps & Partial<DefaultableConfigProps>);
    mergeConfig({ ports, build, image, networks, ...composeService }: ComposeService): void;
    validateConfig(): void;
    getComposeService: GetComposeService;
    createResponsivenessCheckCmd: () => string;
}
export { PostgresRunnerConfig };
export default PostgresRunner;
