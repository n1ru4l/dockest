"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_1 = __importDefault(require("jest"));
const ConfigurationError_1 = __importDefault(require("../errors/ConfigurationError"));
const Logger_1 = __importDefault(require("../Logger"));
const DEFAULT_CONFIG = {
    lib: jest_1.default,
    projects: ['.'],
    runInBand: true,
};
const runJest = async (config) => {
    const jestConfig = { ...DEFAULT_CONFIG, ...config.jest };
    const { lib, projects } = jestConfig;
    let success = false;
    validateJestConfig(jestConfig);
    try {
        Logger_1.default.info(`Dependencies up and running: Executing Jest`, { nl: 1 });
        const jestResult = await lib.runCLI(jestConfig, projects);
        if (!jestResult.results.success) {
            Logger_1.default.error(`Jest test(s) failed`, { nl: 1 });
            success = false;
        }
        else {
            Logger_1.default.info(`Jest test(s) successful`, { pnl: 1, nl: 1 });
            success = true;
        }
    }
    catch (error) {
        Logger_1.default.error(`Jest test(s) failed`, { data: { error } });
        success = false;
    }
    config.$.jestRanWithResult = true;
    return success;
};
const validateJestConfig = (config) => {
    // Validate jest
    if (!config) {
        throw new ConfigurationError_1.default('Jest configuration object missing');
    }
    // Validate jest.lib
    if (!config.lib) {
        throw new ConfigurationError_1.default('Jest libray missing');
    }
    // Validate jest version
    const MINIMUM_JEST_VERSION = '20.0.0'; // Released 2017-05-06: https://github.com/facebook/jest/releases/tag/v20.0.0
    if (config.lib.getVersion() < MINIMUM_JEST_VERSION) {
        throw new ConfigurationError_1.default('Jest version too old: Please update');
    }
};
exports.default = runJest;
//# sourceMappingURL=runJest.js.map