import KafkaRunner, { KafkaRunnerConfig } from './KafkaRunner';
import PostgresRunner, { PostgresRunnerConfig } from './PostgresRunner';
import RedisRunner, { RedisRunnerConfig } from './RedisRunner';
import ZooKeeperRunner, { ZooKeeperRunnerConfig } from './ZooKeeperRunner';
import GeneralPurposeRunner, { GeneralPurposeRunnerConfig } from './GeneralPurposeRunner';
import Logger from '../Logger';
export declare type Runner = KafkaRunner | PostgresRunner | RedisRunner | ZooKeeperRunner | GeneralPurposeRunner;
export declare type RunnerConfig = KafkaRunnerConfig | PostgresRunnerConfig | RedisRunnerConfig | ZooKeeperRunnerConfig | GeneralPurposeRunnerConfig;
export interface ComposeService {
    ports: PortBindingType[];
    networks?: {
        [key: string]: null;
    };
    volumes?: string[];
    command?: string;
    container_name?: string;
    depends_on?: string[];
    environment?: {
        [key: string]: string | number;
    };
    labels?: string;
    links?: string;
    image?: string;
    build?: {
        context: string;
        dockerfile: string;
        args: string;
        cache_from: string;
        labels: string;
        shm_size: string;
        target: string;
    } | string;
    extra_hosts?: string[];
}
export interface ComposeFile {
    version: string;
    services: {
        [key: string]: ComposeService;
    };
    networks?: {
        [key: string]: null;
    };
    volumes?: {
        [key: string]: null;
    };
}
export declare type GetComposeService = () => ComposeService;
export interface BaseRunner {
    getComposeService: GetComposeService;
    containerId: string;
    initializer: string;
    runnerConfig: RunnerConfig;
    logger: Logger;
    validateConfig: () => void;
    isBridgeNetworkMode: boolean;
}
export interface SharedRequiredConfigProps {
    service: string;
}
export declare type DependsOn = Runner[];
export declare type PortBindingType = {
    published: number;
    target: number;
};
export interface SharedDefaultableConfigProps {
    build: string | undefined | any;
    commands: string[];
    connectionTimeout: number;
    dependsOn: DependsOn;
    host: string;
    image: string | undefined;
    networks: string[] | undefined;
    ports: PortBindingType[];
    props: {
        [key: string]: any;
    };
    responsivenessTimeout: number;
}