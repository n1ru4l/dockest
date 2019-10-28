declare const execaWrapper: (command: string, runner?: import("../runners/KafkaRunner").default | import("../runners/PostgresRunner").default | import("../runners/RedisRunner").default | import("../runners/ZooKeeperRunner").default | import("../runners/GeneralPurposeRunner").default | undefined) => Promise<string>;
export default execaWrapper;
