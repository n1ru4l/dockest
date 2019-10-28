import { ReadinessCheck, ReadinessCheckResult } from './@types';
import { Runner } from '../runners/@types';
export declare class PortConnectivityReadinessCheck implements ReadinessCheck {
    private timeout;
    private isAborted;
    constructor({ timeout }: {
        runInsideContainer?: boolean;
        timeout?: number;
    });
    start(runner: Runner): Promise<ReadinessCheckResult>;
    cancel(): void;
}
