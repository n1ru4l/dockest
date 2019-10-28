"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const constants_1 = require("./constants");
const getLogArgs = (message, payload) => {
    const { data, service, symbol, nl = 0, pnl = 0 } = payload;
    let logArgs = [];
    if (!!pnl && pnl > 0) {
        logArgs = logArgs.concat(new Array(pnl).fill('\n'));
    }
    const derivedService = service || 'Dockest';
    const derivedSymbol = symbol || '🌈';
    logArgs.push(`${derivedSymbol} ${derivedService} ${derivedSymbol} ${message}`);
    if (!!data && Logger.logLevel === constants_1.LOG_LEVEL.DEBUG) {
        logArgs.push(JSON.stringify(data, null, 2));
    }
    if (!!nl && nl > 0) {
        logArgs = logArgs.concat(new Array(nl).fill('\n'));
    }
    return logArgs;
};
class Logger {
    constructor(runner) {
        this.runnerService = '';
        this.runnerSymbol = '🦇 ';
        this.setRunnerSymbol = (symbol) => {
            this.runnerSymbol = symbol;
        };
        this.error = (message, payload = {}) => Logger.error(message, { ...payload, service: this.runnerService, symbol: this.runnerSymbol });
        this.warn = (message, payload = {}) => Logger.warn(message, { ...payload, service: this.runnerService, symbol: this.runnerSymbol });
        this.info = (message, payload = {}) => Logger.info(message, { ...payload, service: this.runnerService, symbol: this.runnerSymbol });
        this.debug = (message, payload = {}) => Logger.debug(message, { ...payload, service: this.runnerService, symbol: this.runnerSymbol });
        this.runnerService = runner ? runner.runnerConfig.service : '';
    }
}
Logger.logLevel = constants_1.LOG_LEVEL.INFO;
Logger.error = (message, payload = {}) => {
    if (Logger.logLevel >= constants_1.LOG_LEVEL.ERROR) {
        console.error(...getLogArgs(message, payload)); // eslint-disable-line no-console
    }
};
Logger.warn = (message, payload = {}) => {
    if (Logger.logLevel >= constants_1.LOG_LEVEL.WARN) {
        console.warn(...getLogArgs(message, payload)); // eslint-disable-line no-console
    }
};
Logger.info = (message, payload = {}) => {
    if (Logger.logLevel >= constants_1.LOG_LEVEL.INFO) {
        console.info(...getLogArgs(message, payload)); // eslint-disable-line no-console
    }
};
Logger.debug = (message, payload = {}) => {
    if (Logger.logLevel >= constants_1.LOG_LEVEL.DEBUG) {
        console.debug(...getLogArgs(message, payload)); // eslint-disable-line no-console
    }
};
Logger.replacePrevLine = (m, isLast = false) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    readline_1.default.cursorTo(process.stdout, 0, null);
    process.stdout.write(m);
    if (isLast) {
        process.stdout.write('\n\n');
    }
};
Logger.perf = (perfStart) => {
    if (perfStart !== 0) {
        const perfTime = Math.floor((Date.now() - perfStart) / 1000);
        let hours = Math.floor(perfTime / 3600);
        let minutes = Math.floor((perfTime - hours * 3600) / 60);
        let seconds = perfTime - hours * 3600 - minutes * 60;
        if (hours < 10) {
            hours = `0${hours}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        Logger.info(`Elapsed time: ${hours}:${minutes}:${seconds}`);
    }
};
exports.default = Logger;
//# sourceMappingURL=Logger.js.map