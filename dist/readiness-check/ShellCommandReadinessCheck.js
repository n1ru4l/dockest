"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("./@types");
const execaWrapper_1 = __importDefault(require("../utils/execaWrapper"));
const sleep_1 = __importDefault(require("../utils/sleep"));
class ShellCommandReadinessCheck {
    constructor({ command, timeout = 30 }) {
        this.command = command;
        this.timeout = timeout;
        this.isAborted = false;
    }
    async start(runner) {
        let remainingTries = this.timeout;
        while (remainingTries > 0) {
            if (this.isAborted)
                return _types_1.ReadinessCheckResult.CANCEL;
            try {
                await execaWrapper_1.default(`docker exec ${runner.containerId} ${this.command}`, runner);
                return _types_1.ReadinessCheckResult.SUCCESS;
            }
            catch (err) {
                remainingTries--;
                await sleep_1.default(1000);
            }
        }
        return _types_1.ReadinessCheckResult.TIMEOUT;
    }
    cancel() {
        this.isAborted = true;
    }
}
exports.ShellCommandReadinessCheck = ShellCommandReadinessCheck;
//# sourceMappingURL=ShellCommandReadinessCheck.js.map