"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const index_1 = require("../index");
const Logger_1 = __importDefault(require("../../Logger"));
const trim_1 = __importDefault(require("../../utils/trim"));
const validateConfig_1 = __importDefault(require("../../utils/validateConfig"));
const validateTypes_1 = __importDefault(require("../../utils/validateTypes"));
const composeFileHelper_1 = __importDefault(require("../composeFileHelper"));
const DEFAULT_PORT_PLAINTEXT = 9092;
const DEFAULT_PORT_SASL_SSL = 9094;
const DEFAULT_PORT_SCHEMA_REGISTRY = 8081;
const DEFAULT_PORT_SSL = 9093;
const DEFAULT_AUTO_CREATE_TOPIC = true;
const DEFAULT_CONFIG = {
    ...constants_1.SHARED_DEFAULT_CONFIG_PROPS,
    autoCreateTopic: DEFAULT_AUTO_CREATE_TOPIC,
    ports: [
        {
            published: DEFAULT_PORT_PLAINTEXT,
            target: DEFAULT_PORT_PLAINTEXT,
        },
    ],
};
class KafkaRunner {
    constructor(config) {
        this.containerId = '';
        this.initializer = '';
        this.isBridgeNetworkMode = false;
        this.getComposeService = () => {
            const { autoCreateTopic, dependsOn, ports, service } = this.runnerConfig;
            const getZooKeeperConnect = () => {
                const zooKeeperDependency = dependsOn.find(runner => runner instanceof index_1.ZooKeeperRunner);
                if (!zooKeeperDependency) {
                    return {};
                }
                const exposedZooKeeperPortBinding = zooKeeperDependency.runnerConfig.ports.find(portBinding => portBinding.target === index_1.ZooKeeperRunner.DEFAULT_PORT);
                const port = exposedZooKeeperPortBinding ? exposedZooKeeperPortBinding.published : undefined;
                return {
                    KAFKA_ZOOKEEPER_CONNECT: `${zooKeeperDependency.runnerConfig.service}:${port}`,
                };
            };
            const getAdvertisedListeners = () => {
                const exposedPlaintextPortBinding = ports.find(portBinding => portBinding.target === DEFAULT_PORT_PLAINTEXT);
                const PLAINTEXT = exposedPlaintextPortBinding
                    ? `PLAINTEXT://${service}:2${exposedPlaintextPortBinding.published}, PLAINTEXT_HOST://${constants_1.SHARED_DEFAULT_CONFIG_PROPS.host}:${exposedPlaintextPortBinding.published}`
                    : '';
                // TODO: Investigate exact behaviour for SSL & SASL_SSL
                const exposedSSLPortBinding = ports.find(portBinding => portBinding.target === DEFAULT_PORT_SSL);
                const SSL = !!exposedSSLPortBinding
                    ? `, SSL://${service}:2${DEFAULT_PORT_SSL}, SSL_HOST://${constants_1.SHARED_DEFAULT_CONFIG_PROPS.host}:${exposedSSLPortBinding.published}`
                    : '';
                const exposedSASLSSLPortBinding = ports.find(portBinding => portBinding.target === DEFAULT_PORT_SASL_SSL);
                const SASL_SSL = !!exposedSASLSSLPortBinding
                    ? `, SASL_SSL://${service}:2${DEFAULT_PORT_SASL_SSL}, SASL_SSL_HOST://${constants_1.SHARED_DEFAULT_CONFIG_PROPS.host}:${exposedSASLSSLPortBinding.published}`
                    : '';
                return {
                    KAFKA_ADVERTISED_LISTENERS: trim_1.default(`${PLAINTEXT}${SSL}${SASL_SSL}`, ''),
                };
            };
            const getSecurityProtocolMap = () => {
                const exposedPlaintextPort = !!ports.find(portBinding => portBinding.target === DEFAULT_PORT_PLAINTEXT);
                const PLAINTEXT = exposedPlaintextPort ? 'PLAINTEXT:PLAINTEXT, PLAINTEXT_HOST:PLAINTEXT' : '';
                const exposedSSLPort = !!ports.find(portBinding => portBinding.target === DEFAULT_PORT_SSL);
                const SSL = exposedSSLPort ? ', SSL:SSL, SSL_HOST:SSL' : '';
                const exposedSASLSSLPort = !!ports.find(portBinding => portBinding.target === DEFAULT_PORT_SASL_SSL);
                const SASL_SSL = exposedSASLSSLPort ? ', SASL_SSL:SASL_SSL, SASL_SSL_HOST:SASL_SSL' : '';
                return {
                    KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: trim_1.default(`${PLAINTEXT}${SSL}${SASL_SSL}`, ''),
                };
            };
            return {
                environment: {
                    // https://docs.confluent.io/current/installation/docker/config-reference.html#required-confluent-kafka-settings
                    ...getZooKeeperConnect(),
                    ...getAdvertisedListeners(),
                    ...getSecurityProtocolMap(),
                    KAFKA_AUTO_CREATE_TOPICS_ENABLE: autoCreateTopic ? 'true' : 'false',
                    KAFKA_BROKER_ID: 1,
                    KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1,
                },
                ...composeFileHelper_1.default(this.runnerConfig),
            };
        };
        this.runnerConfig = {
            ...DEFAULT_CONFIG,
            ...config,
        };
        this.logger = new Logger_1.default(this);
    }
    mergeConfig({ ports, build, image, networks, ...composeService }) {
        this.runnerConfig = {
            ...this.runnerConfig,
            ...composeService,
            ...(image ? { image } : {}),
            ...(ports ? { ports } : {}),
            ...(networks ? { networks: Object.keys(networks) } : {}),
        };
    }
    validateConfig() {
        const schema = {
            service: validateTypes_1.default.isString,
        };
        validateConfig_1.default(schema, this.runnerConfig);
    }
}
KafkaRunner.DEFAULT_HOST = constants_1.SHARED_DEFAULT_CONFIG_PROPS.host;
KafkaRunner.DEFAULT_PORT_PLAINTEXT = DEFAULT_PORT_PLAINTEXT;
KafkaRunner.DEFAULT_PORT_SASL_SSL = DEFAULT_PORT_SASL_SSL;
KafkaRunner.DEFAULT_PORT_SCHEMA_REGISTRY = DEFAULT_PORT_SCHEMA_REGISTRY; // TODO: Move this to the Schemaregistry Runner once it's implemented
KafkaRunner.DEFAULT_PORT_SSL = DEFAULT_PORT_SSL;
exports.default = KafkaRunner;
/**
 * Possible TODO: Create topic through bash
 */
// await execa(
//   `docker exec ${
//     // @ts-ignore
//     config.runners.find(runner => runner instanceof KafkaRunner).containerId
//   } bash -c "kafka-topics --create --if-not-exists --topic dockesttopic --replication-factor 1 --partitions 1 --zookeeper zookeeper1confluentinc:2181"`
// )
/**
 * TODO: SSL & SASL_SSL
 */
// [DEFAULT_PORT_SSL]: DEFAULT_PORT_SSL,
// [DEFAULT_PORT_SASL_SSL]: DEFAULT_PORT_SASL_SSL,
// const DEFAULT_PORT_SSL = 9093
// const DEFAULT_PORT_SASL_SSL = 9094
// SSL://${service}:29093,SSL_HOST://${host}:${DEFAULT_PORT_SSL},\
// SASL_SSL://${service}:29094,SASL_SSL_HOST://${host}:${DEFAULT_PORT_SASL_SSL}" \
//# sourceMappingURL=index.js.map