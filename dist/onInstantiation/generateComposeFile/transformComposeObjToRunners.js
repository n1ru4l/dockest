"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runners_1 = require("../../runners");
const ConfigurationError_1 = __importDefault(require("../../errors/ConfigurationError"));
const { keys } = Object;
const REDIS_REG_EXP = RegExp('redis');
const POSTGRES_REG_EXP = RegExp('postgres');
const ZOOKEEPER_REG_EXP = RegExp('zookeeper');
const KAFKA_REG_EXP = RegExp('kafka');
exports.default = (config, composeObj) => keys(composeObj.services).map(service => {
    const attachedRunnerExist = config.runners.find(runner => runner.runnerConfig.service === service);
    if (attachedRunnerExist) {
        return attachedRunnerExist;
    }
    const composeService = composeObj.services[service];
    /**
     * Redis
     */
    if (REDIS_REG_EXP.test(composeService.image || '') || REDIS_REG_EXP.test(service)) {
        return new runners_1.RedisRunner({
            service,
            image: composeService.image,
            ports: composeService.ports.reduce((acc, curr) => {
                const [host, container] = curr.split(':');
                acc[host] = container;
                return acc;
            }, {}),
            props: composeService.environment,
        });
    }
    /**
     * Postgres
     */
    if (POSTGRES_REG_EXP.test(composeService.image || '') || POSTGRES_REG_EXP.test(service)) {
        if (!composeService.environment) {
            throw new ConfigurationError_1.default(`${service}: Invalid environment`);
        }
        return new runners_1.PostgresRunner({
            service,
            image: composeService.image,
            ports: composeService.ports.reduce((acc, curr) => {
                const [host, container] = curr.split(':');
                acc[host] = container;
                return acc;
            }, {}),
            props: composeService.environment,
            database: `${composeService.environment[runners_1.PostgresRunner.ENVIRONMENT_DATABASE]}`,
            password: `${composeService.environment[runners_1.PostgresRunner.ENVIRONMENT_PASSWORD]}`,
            username: `${composeService.environment[runners_1.PostgresRunner.ENVIRONMENT_USERNAME]}`,
        });
    }
    /**
     * ZooKeeper
     */
    if (ZOOKEEPER_REG_EXP.test(composeService.image || '') || ZOOKEEPER_REG_EXP.test(service)) {
        if (!composeService.environment) {
            throw new ConfigurationError_1.default(`${service}: Invalid environment`);
        }
        return new runners_1.ZooKeeperRunner({
            service,
            image: composeService.image,
            ports: composeService.ports.reduce((acc, curr) => {
                const [host, container] = curr.split(':');
                acc[host] = container;
                return acc;
            }, {}),
            props: composeService.environment,
        });
    }
    /**
     * Kafka
     */
    if (KAFKA_REG_EXP.test(composeService.image || '') || KAFKA_REG_EXP.test(service)) {
        if (!composeService.environment) {
            throw new ConfigurationError_1.default(`${service}: Invalid environment`);
        }
        return new runners_1.KafkaRunner({
            service,
            image: composeService.image,
            ports: composeService.ports.reduce((acc, curr) => {
                const [host, container] = curr.split(':');
                acc[host] = container;
                return acc;
            }, {}),
            props: composeService.environment,
        });
    }
    return new runners_1.GeneralPurposeRunner({
        service,
        image: composeService.image,
    });
});
//# sourceMappingURL=transformComposeObjToRunners.js.map