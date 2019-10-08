"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sleep_1 = __importDefault(require("./sleep"));
const Logger_1 = __importDefault(require("../Logger"));
exports.default = async (reason = '', secondsToSleep = 30) => {
    for (let i = 0; i < secondsToSleep; i++) {
        Logger_1.default.replacePrevLine(`${reason}: ${i + 1}/${secondsToSleep}`, i === secondsToSleep - 1);
        await sleep_1.default();
    }
};
//# sourceMappingURL=sleepForX.js.map