import { BaseRunner, GetComposeService, SharedDefaultableConfigProps, SharedRequiredConfigProps } from '../@types';
import Logger from '../../Logger';
interface RequiredConfigProps extends SharedRequiredConfigProps {
}
interface DefaultableConfigProps extends SharedDefaultableConfigProps {
    autoCreateTopic: boolean;
}
interface KafkaRunnerConfig extends RequiredConfigProps, DefaultableConfigProps {
}
declare class KafkaRunner implements BaseRunner {
    static DEFAULT_HOST: string;
    static DEFAULT_PORT_PLAINTEXT: string;
    static DEFAULT_PORT_SASL_SSL: string;
    static DEFAULT_PORT_SCHEMA_REGISTRY: string;
    static DEFAULT_PORT_SSL: string;
    containerId: string;
    initializer: string;
    runnerConfig: KafkaRunnerConfig;
    logger: Logger;
    constructor(config: RequiredConfigProps & Partial<DefaultableConfigProps>);
    validateConfig(): void;
    getComposeService: GetComposeService;
}
export { KafkaRunnerConfig };
export default KafkaRunner;
/**
 * Possible TODO: Create topic through bash
 */
/**
 * TODO: SSL & SASL_SSL
 */
