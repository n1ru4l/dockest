/// <reference types="node" />
import execa from 'execa';
import { ZooKeeperRunner, KafkaRunner, PostgresRunner, RedisRunner, GeneralPurposeRunner } from './runners';
import { Runner } from './runners/@types';
import Logger from './Logger';
export declare const mockedExecaStdout = "getContainerId \uD83C\uDF2E";
export declare const runnerCommand = "runRunnerCommands \uD83C\uDF2E";
declare const _default: ({ withRunnerCommands, realLoggers }: {
    withRunnerCommands?: boolean | undefined;
    realLoggers?: boolean | undefined;
}) => {
    initializedRunners: {
        kafkaRunner: KafkaRunner;
        postgresRunner: PostgresRunner;
        redisRunner: RedisRunner;
        zooKeeperRunner: ZooKeeperRunner;
        generalPurposeRunner: GeneralPurposeRunner;
    };
    runners: {
        ZooKeeperRunner: typeof ZooKeeperRunner;
        KafkaRunner: typeof KafkaRunner;
        PostgresRunner: typeof PostgresRunner;
        RedisRunner: typeof RedisRunner;
        GeneralPurposeRunner: typeof GeneralPurposeRunner;
    };
    execa: {
        (file: string, arguments?: readonly string[] | undefined, options?: execa.Options<string> | undefined): execa.ExecaChildProcess<string>;
        (file: string, arguments?: readonly string[] | undefined, options?: execa.Options<null> | undefined): execa.ExecaChildProcess<Buffer>;
        (file: string, options?: execa.Options<string> | undefined): execa.ExecaChildProcess<string>;
        (file: string, options?: execa.Options<null> | undefined): execa.ExecaChildProcess<Buffer>;
        sync(file: string, arguments?: readonly string[] | undefined, options?: execa.SyncOptions<string> | undefined): execa.ExecaSyncReturnValue<string>;
        sync(file: string, arguments?: readonly string[] | undefined, options?: execa.SyncOptions<null> | undefined): execa.ExecaSyncReturnValue<Buffer>;
        sync(file: string, options?: execa.SyncOptions<string> | undefined): execa.ExecaSyncReturnValue<string>;
        sync(file: string, options?: execa.SyncOptions<null> | undefined): execa.ExecaSyncReturnValue<Buffer>;
        command(command: string, options?: execa.Options<string> | undefined): execa.ExecaChildProcess<string>;
        command(command: string, options?: execa.Options<null> | undefined): execa.ExecaChildProcess<Buffer>;
        commandSync(command: string, options?: execa.SyncOptions<string> | undefined): execa.ExecaSyncReturnValue<string>;
        commandSync(command: string, options?: execa.SyncOptions<null> | undefined): execa.ExecaSyncReturnValue<Buffer>;
        node(scriptPath: string, arguments?: readonly string[] | undefined, options?: execa.NodeOptions<string> | undefined): execa.ExecaChildProcess<string>;
        node(scriptPath: string, arguments?: readonly string[] | undefined, options?: execa.Options<null> | undefined): execa.ExecaChildProcess<Buffer>;
        node(scriptPath: string, options?: execa.Options<string> | undefined): execa.ExecaChildProcess<string>;
        node(scriptPath: string, options?: execa.Options<null> | undefined): execa.ExecaChildProcess<Buffer>;
    };
    Logger: typeof Logger;
    createDockestConfig: (options: {
        runners?: Runner[] | undefined;
        opts?: any;
        realLoggers?: boolean | undefined;
    }) => {
        runners: Runner[];
        opts: any;
        jest: {};
        $: {
            failedTeardowns: never[];
            jestRanWithResult: boolean;
            perfStart: number;
            isInsideDockerContainer: boolean;
            hostname: string;
            dockerLogs: never[];
        };
    };
};
export default _default;
