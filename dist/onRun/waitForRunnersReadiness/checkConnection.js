"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const DockestError_1 = __importDefault(require("../../errors/DockestError"));
const sleep_1 = __importDefault(require("../../utils/sleep"));
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
const testables = { acquireConnection };
exports.testables = testables;
exports.default = async (runner) => {
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
                logger.debug(`Checked connection successfully`);
            }
            catch (error) {
                connectionTimeout--;
                await sleep_1.default(1000);
                await recurse(connectionTimeout);
            }
        };
        await recurse(connectionTimeout);
    }
};
//# sourceMappingURL=checkConnection.js.map