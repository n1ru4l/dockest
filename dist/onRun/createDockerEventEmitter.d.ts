import { Runner } from '../runners/@types';
export interface DockerComposeEventInterface<TActionName extends string, TAdditionAtrributes extends {} = {}> {
    time: string;
    type: 'container';
    action: TActionName;
    id: string;
    service: string;
    attributes: {
        image: string;
        name: string;
    } & TAdditionAtrributes;
}
export declare type CreateDockerComposeEvent = DockerComposeEventInterface<'create'>;
export declare type AttachDockerComposeEvent = DockerComposeEventInterface<'attach'>;
export declare type StartDockerComposeEvent = DockerComposeEventInterface<'start'>;
export declare type HealthStatusDockerComposeEvent = DockerComposeEventInterface<'health_status', {
    healthStatus: 'healthy' | 'unhealthy';
}>;
export declare type KillDockerComposeEvent = DockerComposeEventInterface<'kill'>;
export declare type DieDockerComposeEvent = DockerComposeEventInterface<'die'>;
export declare type DockerEventType = CreateDockerComposeEvent | AttachDockerComposeEvent | StartDockerComposeEvent | HealthStatusDockerComposeEvent | KillDockerComposeEvent | DieDockerComposeEvent;
export declare type UnknownDockerComposeEvent = DockerComposeEventInterface<string>;
export declare type DockerEventEmitterListener = (event: DockerEventType) => void;
export interface DockerEventEmitter {
    addListener(serviceName: string, eventListener: DockerEventEmitterListener): void;
    removeListener(serviceName: string, eventListener: DockerEventEmitterListener): void;
    destroy(): void;
}
export declare const createDockerEventEmitter: (services: Runner[]) => DockerEventEmitter;
