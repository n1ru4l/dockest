import { Runner } from '../runners/@types';
export declare const createContainerStartCheck: (runner: Runner, eventStream$: import("rxjs").Observable<import("./createDockerEventEmitter").DockerEventType>) => {
    service: string;
    done: Promise<undefined>;
    cancel: () => void;
};
