import Logger from '../../Logger';
import { BaseRunner, GetComposeService, SharedRequiredConfigProps, SharedDefaultableConfigProps } from '../@types';
interface RequiredConfigProps extends SharedRequiredConfigProps {
}
interface OptionalConfigProps {
    getResponsivenessCheckCommand: (containerId: string) => string;
}
interface DefaultableConfigProps extends SharedDefaultableConfigProps {
}
interface GeneralPurposeRunnerConfig extends RequiredConfigProps, Partial<OptionalConfigProps>, DefaultableConfigProps {
}
declare class GeneralPurposeRunner implements BaseRunner {
    containerId: string;
    initializer: string;
    runnerConfig: GeneralPurposeRunnerConfig;
    logger: Logger;
    createResponsivenessCheckCmd: (() => string) | null;
    constructor(config: RequiredConfigProps & Partial<DefaultableConfigProps> & Partial<OptionalConfigProps>);
    validateConfig(): void;
    getComposeService: GetComposeService;
}
export { GeneralPurposeRunnerConfig };
export default GeneralPurposeRunner;
