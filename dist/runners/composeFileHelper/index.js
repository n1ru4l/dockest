"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getDependsOn_1 = __importDefault(require("./getDependsOn"));
exports.getDependsOn = getDependsOn_1.default;
const getPorts_1 = __importDefault(require("./getPorts"));
exports.getPorts = getPorts_1.default;
const composeFileHelper = (runnerConfig) => {
    const { dependsOn, image, build, ports, props, networks: userNetworks } = runnerConfig;
    let networks;
    if (userNetworks) {
        networks = userNetworks.reduce((acc, curr) => {
            acc[curr] = null;
            return acc;
        }, {});
    }
    return {
        ...getDependsOn_1.default(dependsOn),
        ...(image && image.length ? { image } : {}),
        ...(build ? { build } : {}),
        ...(networks ? { networks } : {}),
        ports,
        ...props,
    };
};
const defaultGetComposeService = (runnerConfig) => ({
    ...composeFileHelper(runnerConfig),
});
exports.defaultGetComposeService = defaultGetComposeService;
exports.default = composeFileHelper;
//# sourceMappingURL=index.js.map