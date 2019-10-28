"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complicated = {
    version: '3.7',
    services: {
        kafka: {
            environment: {
                KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181',
                KAFKA_ADVERTISED_LISTENERS: 'PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092',
                KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: 'PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT',
                KAFKA_AUTO_CREATE_TOPICS_ENABLE: 'true',
                KAFKA_BROKER_ID: 1,
                KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1,
            },
            // eslint-disable-next-line @typescript-eslint/camelcase
            depends_on: ['zookeeper'],
            image: 'kafka/image:123',
            ports: [
                {
                    published: 9092,
                    target: 9092,
                },
            ],
        },
        zookeeper: {
            environment: {
                ZOOKEEPER_CLIENT_PORT: '2181',
            },
            image: 'zookeeper/image:123',
            ports: [
                {
                    published: 2181,
                    target: 2181,
                },
            ],
        },
        postgres: {
            environment: {
                POSTGRES_DB: '_',
                POSTGRES_PASSWORD: '_',
                POSTGRES_USER: '_',
            },
            image: 'postgres/image:123',
            ports: [
                {
                    published: 5432,
                    target: 5432,
                },
            ],
        },
        redis: {
            image: 'redis/image:123',
            ports: [
                {
                    published: 6379,
                    target: 6379,
                },
            ],
        },
        general: {
            image: 'general/image:123',
            ports: [],
        },
    },
};
exports.singlePostgres = {
    version: '3.7',
    services: {
        postgres: {
            environment: {
                POSTGRES_DB: '_',
                POSTGRES_PASSWORD: '_',
                POSTGRES_USER: '_',
            },
            image: 'postgres/image:123',
            ports: [
                {
                    published: 5432,
                    target: 5432,
                },
            ],
        },
    },
};
exports.singleRedis = {
    version: '3.7',
    services: {
        redis: {
            image: 'redis/image:123',
            ports: [
                {
                    published: 6379,
                    target: 6379,
                },
            ],
        },
    },
};
exports.postgresAndRedis = {
    version: '3.7',
    services: {
        ...exports.singlePostgres.services,
        ...exports.singleRedis.services,
    },
};
//# sourceMappingURL=composeObj.js.map