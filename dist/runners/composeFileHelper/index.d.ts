import getDependsOn from './getDependsOn';
import getPorts from './getPorts';
import { ComposeService } from '../@types';
declare const composeFileHelper: (runnerConfig: import("../KafkaRunner").KafkaRunnerConfig | import("../PostgresRunner").PostgresRunnerConfig | import("../RedisRunner").RedisRunnerConfig | import("../ZooKeeperRunner").ZooKeeperRunnerConfig | import("../GeneralPurposeRunner").GeneralPurposeRunnerConfig) => ComposeService;
declare const defaultGetComposeService: (runnerConfig: import("../KafkaRunner").KafkaRunnerConfig | import("../PostgresRunner").PostgresRunnerConfig | import("../RedisRunner").RedisRunnerConfig | import("../ZooKeeperRunner").ZooKeeperRunnerConfig | import("../GeneralPurposeRunner").GeneralPurposeRunnerConfig) => ComposeService;
export { defaultGetComposeService, getDependsOn, getPorts };
export default composeFileHelper;