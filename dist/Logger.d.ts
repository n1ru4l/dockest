import { Runner } from './runners/@types';
interface Payload {
    data?: {
        [key: string]: any;
    };
    icon?: string;
    nl?: number;
    pnl?: number;
    service?: string;
    symbol?: string;
    error?: Error;
}
declare type LogMethod = (message: string, payload?: Payload) => void;
declare class Logger {
    static logLevel: number;
    static error: LogMethod;
    static warn: LogMethod;
    static info: LogMethod;
    static debug: LogMethod;
    static replacePrevLine: (m: string, isLast?: boolean) => void;
    static perf: (perfStart: number) => void;
    private runnerService;
    private runnerSymbol;
    constructor(runner?: Runner);
    setRunnerSymbol: (symbol: string) => void;
    error: LogMethod;
    warn: LogMethod;
    info: LogMethod;
    debug: LogMethod;
}
export { LogMethod };
export default Logger;
