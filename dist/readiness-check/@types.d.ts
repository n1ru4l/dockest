import { Runner } from '../runners/@types';
import { ServiceDockerEventStream } from '../onRun/createServiceDockerEventStream';
export declare enum ReadinessCheckResult {
    TIMEOUT = "TIMEOUT",
    SUCCESS = "SUCCESS",
    CANCEL = "CANCEL"
}
export interface ReadinessCheck {
    start(runner: Runner, eventStream$: ServiceDockerEventStream): Promise<ReadinessCheckResult>;
    cancel(): void;
}
