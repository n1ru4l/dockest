export declare const complicated: {
    version: string;
    services: {
        kafka: {
            environment: {
                KAFKA_ZOOKEEPER_CONNECT: string;
                KAFKA_ADVERTISED_LISTENERS: string;
                KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: string;
                KAFKA_AUTO_CREATE_TOPICS_ENABLE: string;
                KAFKA_BROKER_ID: number;
                KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: number;
            };
            depends_on: string[];
            image: string;
            ports: {
                published: number;
                target: number;
            }[];
        };
        zookeeper: {
            environment: {
                ZOOKEEPER_CLIENT_PORT: string;
            };
            image: string;
            ports: {
                published: number;
                target: number;
            }[];
        };
        postgres: {
            environment: {
                POSTGRES_DB: string;
                POSTGRES_PASSWORD: string;
                POSTGRES_USER: string;
            };
            image: string;
            ports: {
                published: number;
                target: number;
            }[];
        };
        redis: {
            image: string;
            ports: {
                published: number;
                target: number;
            }[];
        };
        general: {
            image: string;
            ports: never[];
        };
    };
};
export declare const singlePostgres: {
    version: string;
    services: {
        postgres: {
            environment: {
                POSTGRES_DB: string;
                POSTGRES_PASSWORD: string;
                POSTGRES_USER: string;
            };
            image: string;
            ports: {
                published: number;
                target: number;
            }[];
        };
    };
};
export declare const singleRedis: {
    version: string;
    services: {
        redis: {
            image: string;
            ports: {
                published: number;
                target: number;
            }[];
        };
    };
};
export declare const postgresAndRedis: {
    version: string;
    services: {
        redis: {
            image: string;
            ports: {
                published: number;
                target: number;
            }[];
        };
        postgres: {
            environment: {
                POSTGRES_DB: string;
                POSTGRES_PASSWORD: string;
                POSTGRES_USER: string;
            };
            image: string;
            ports: {
                published: number;
                target: number;
            }[];
        };
    };
};
