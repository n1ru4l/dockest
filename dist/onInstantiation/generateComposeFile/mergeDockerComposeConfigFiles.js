"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa_1 = __importDefault(require("execa"));
const path_1 = __importDefault(require("path"));
const getComposeObjFromComposeYmlString_1 = __importDefault(require("./getComposeObjFromComposeYmlString"));
exports.default = (cwd, composeFiles) => {
    const result = execa_1.default.sync('docker-compose', composeFiles
        .slice()
        .reverse()
        .reduce((result, composeFilePath) => {
        result.unshift('-f', path_1.default.join(cwd, composeFilePath));
        return result;
    }, ['config']), {
        reject: false,
    });
    if (result.exitCode !== 0) {
        console.error(`🚨 Invalid docker-compose config: \n ${result.stderr}\n\n You can declare the given option via your runner definition or preferably the compose file. \n`);
        throw new TypeError('Invalid docker-compose config.');
    }
    return getComposeObjFromComposeYmlString_1.default(result.stdout);
};
//# sourceMappingURL=mergeDockerComposeConfigFiles.js.map