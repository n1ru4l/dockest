"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assignRunnerSymbol_1 = __importDefault(require("./assignRunnerSymbol"));
const generateComposeFile_1 = __importDefault(require("./generateComposeFile"));
const setLogLevel_1 = __importDefault(require("./setLogLevel"));
const setupExitHandler_1 = __importDefault(require("./setupExitHandler"));
const onInstantiation = (config) => {
    setLogLevel_1.default(config);
    generateComposeFile_1.default(config);
    assignRunnerSymbol_1.default(config);
    setupExitHandler_1.default(config);
};
exports.default = onInstantiation;
//# sourceMappingURL=index.js.map