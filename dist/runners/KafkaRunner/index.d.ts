import { BaseRunner, GetComposeService, SharedDefaultableConfigProps, SharedRequiredConfigProps, ComposeService } from '../@types';
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
    static DEFAULT_PORT_PLAINTEXT: number;
    static DEFAULT_PORT_SASL_SSL: number;
    static DEFAULT_PORT_SCHEMA_REGISTRY: number;
    static DEFAULT_PORT_SSL: number;
    containerId: string;
    initializer: string;
    runnerConfig: KafkaRunnerConfig;
    logger: Logger;
    isBridgeNetworkMode: boolean;
    constructor(config: RequiredConfigProps & Partial<DefaultableConfigProps>);
    mergeConfig({ ports, build, image, networks, ...composeService }: ComposeService): void;
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
