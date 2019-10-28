import { Runner } from '../runners/@types';
export interface ContainerDiedTask {
    service: string;
    done: Promise<void>;
    cancel: () => void;
}
export declare const createContainerDiedCheck: (runner: Runner, eventStream$: import("rxjs").Observable<import("./createDockerEventEmitter").DockerEventType>) => ContainerDiedTask;
