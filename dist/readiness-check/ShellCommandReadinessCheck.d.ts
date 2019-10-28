import { ReadinessCheck, ReadinessCheckResult } from './@types';
import { Runner } from '../runners/@types';
export declare class ShellCommandReadinessCheck implements ReadinessCheck {
    private command;
    private timeout;
    private isAborted;
    constructor({ command, timeout }: {
        command: string;
        runInsideContainer?: boolean;
        timeout?: number;
    });
    start(runner: Runner): Promise<ReadinessCheckResult>;
    cancel(): void;
}
