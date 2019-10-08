"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const createComposeObjFromComposeFile_1 = __importDefault(require("./createComposeObjFromComposeFile"));
const createComposeObjFromRunners_1 = __importDefault(require("./createComposeObjFromRunners"));
const transformComposeObjToRunners_1 = __importDefault(require("./transformComposeObjToRunners"));
const constants_1 = require("../../constants");
exports.default = (config, yaml = js_yaml_1.default, fs = fs_1.default) => {
    const configFiles = [];
    if (config.opts.composeFile) {
        if (Array.isArray(config.opts.composeFile)) {
            configFiles.push(...config.opts.composeFile);
        }
        else {
            configFiles.push(config.opts.composeFile);
        }
    }
    let { version: dockerComposeFileVersion } = createComposeObjFromComposeFile_1.default(configFiles);
    const versionNumber = parseFloat(dockerComposeFileVersion);
    if (Math.trunc(versionNumber) < 3) {
        throw new TypeError(`Incompatible docker-compose file version. Please use version '3.x'.`);
    }
    else if (versionNumber !== 3.7) {
        console.warn(`You should upgrade to docker-compose file version '3.7'. Dockest automatically uses that version.`); // eslint-disable-line no-console
        dockerComposeFileVersion = '3.7';
    }
    const composeObjFromRunners = createComposeObjFromRunners_1.default(config, dockerComposeFileVersion);
    fs.writeFileSync(constants_1.GENERATED_RUNNER_COMPOSE_FILE_PATH, yaml.safeDump(composeObjFromRunners));
    configFiles.push(constants_1.GENERATED_RUNNER_COMPOSE_FILE_NAME);
    // merge all config
    const composeObjFromComposeFile = createComposeObjFromComposeFile_1.default(configFiles);
    if (config.opts.guessRunnerType) {
        config.runners = transformComposeObjToRunners_1.default(config, composeObjFromComposeFile);
    }
    // write final config to fs
    fs.writeFileSync(constants_1.GENERATED_COMPOSE_FILE_PATH, yaml.safeDump(composeObjFromComposeFile));
    // set environment variable that can be used with the test-helpers
    // jest.runCLI will pass this environment variable into the testcase runners
    process.env.DOCKEST_INTERNAL_CONFIG = JSON.stringify(composeObjFromComposeFile);
    return { composeFileConfig: composeObjFromComposeFile };
};
//# sourceMappingURL=index.js.map