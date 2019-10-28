import { Observable } from 'rxjs';
import { DockerEventEmitter, DockerEventType } from './createDockerEventEmitter';
export declare type ServiceDockerEventStream = Observable<DockerEventType>;
export declare const createServiceDockerEventStream: (serviceName: string, eventEmitter: DockerEventEmitter) => Observable<DockerEventType>;
