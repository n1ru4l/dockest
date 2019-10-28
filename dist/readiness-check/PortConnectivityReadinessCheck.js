"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const _types_1 = require("./@types");
const DockestError_1 = __importDefault(require("../errors/DockestError"));
const sleep_1 = __importDefault(require("../utils/sleep"));
const acquireConnection = (host, port) => new Promise((resolve, reject) => {
    let connected = false;
    let timeoutId = null;
    const netSocket = net_1.default
        .createConnection({ host, port })
        .on('connect', () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        connected = true;
        netSocket.end();
        resolve();
    })
        .on('error', () => {
        connected = false;
    });
    timeoutId = setTimeout(() => !connected && reject(new Error('Timeout while acquiring connection')), 1000);
});
class PortConnectivityReadinessCheck {
    constructor({ timeout = 30 }) {
        this.timeout = timeout;
        this.isAborted = false;
    }
    async start(runner) {
        const { runnerConfig: { host, service, connectionTimeout, ports }, logger, } = runner;
        const portKey = runner.isBridgeNetworkMode ? 'target' : 'published';
        for (const { [portKey]: port } of ports) {
            const recurse = async (connectionTimeout) => {
                logger.debug(`Checking connection (${host}:${port}) (Timeout in: ${connectionTimeout}s)`);
                if (connectionTimeout <= 0) {
                    throw new DockestError_1.default(`${service} connection timed out`);
                }
                try {
                    await acquireConnection(host, port);
                }
                catch (error) {
                    connectionTimeout--;
                    await sleep_1.default(1000);
                    await recurse(connectionTimeout);
                }
            };
            await recurse(connectionTimeout);
        }
        let remainingTries = this.timeout;
        while (remainingTries > 0) {
            if (this.isAborted)
                return _types_1.ReadinessCheckResult.CANCEL;
            try {
                for (const { [portKey]: port } of ports) {
                    logger.debug(`Checking connection (${host}:${port}) (Timeout in: ${connectionTimeout}s)`);
                    await acquireConnection(host, port);
                }
                logger.debug(`Checked connection successfully.`);
                return _types_1.ReadinessCheckResult.SUCCESS;
            }
            catch (err) {
                remainingTries--;
                await sleep_1.default(1000);
            }
        }
        logger.error(`${service} connection timed out.`);
        return _types_1.ReadinessCheckResult.TIMEOUT;
    }
    cancel() {
        this.isAborted = true;
    }
}
exports.PortConnectivityReadinessCheck = PortConnectivityReadinessCheck;
//# sourceMappingURL=PortConnectivityReadinessCheck.js.map