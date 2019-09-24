import { BaseRunner, GetComposeService, SharedDefaultableConfigProps, SharedRequiredConfigProps } from '../@types';
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
    static DEFAULT_PORT: string;
    static ENVIRONMENT_DATABASE: string;
    static ENVIRONMENT_PASSWORD: string;
    static ENVIRONMENT_USERNAME: string;
    containerId: string;
    initializer: string;
    runnerConfig: PostgresRunnerConfig;
    logger: Logger;
    constructor(configUserInput: RequiredConfigProps & Partial<DefaultableConfigProps>);
    validateConfig(): void;
    getComposeService: GetComposeService;
    createResponsivenessCheckCmd: () => string;
}
export { PostgresRunnerConfig };
export default PostgresRunner;
