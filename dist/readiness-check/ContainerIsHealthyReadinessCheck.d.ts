import { ReadinessCheck, ReadinessCheckResult } from './@types';
import { Runner } from '../runners/@types';
import { ServiceDockerEventStream } from '../onRun/createServiceDockerEventStream';
export declare class ContainerIsHealthyReadinessCheck implements ReadinessCheck {
    private timeout;
    constructor({ timeout }: {
        timeout?: number;
    });
    start(_runner: Runner, eventStream$: ServiceDockerEventStream): Promise<ReadinessCheckResult>;
    cancel(): void;
}
