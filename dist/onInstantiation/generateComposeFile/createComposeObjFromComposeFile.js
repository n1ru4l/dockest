"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mergeDockerComposeConfigFiles_1 = __importDefault(require("./mergeDockerComposeConfigFiles"));
exports.default = (composeFiles, nodeProcess = process) => {
    const cwd = nodeProcess.cwd();
    let composeObj = {
        version: '3',
        services: {},
    };
    if (composeFiles.length > 0) {
        composeObj = mergeDockerComposeConfigFiles_1.default(cwd, composeFiles);
    }
    return composeObj;
};
//# sourceMappingURL=createComposeObjFromComposeFile.js.map