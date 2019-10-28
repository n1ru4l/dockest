"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_docker_1 = __importDefault(require("is-docker")); // eslint-disable-line import/default
const isInsideDockerContainer = is_docker_1.default();
if (!process.env.DOCKEST_INTERNAL_CONFIG) {
    throw new Error('Not executed inside dockest context.');
}
const config = JSON.parse(process.env.DOCKEST_INTERNAL_CONFIG);
exports.getHostAddress = () => {
    if (!isInsideDockerContainer) {
        return `host.docker.internal`;
    }
    return `host.dockest-runner.internal`;
};
exports.getServiceAddress = (serviceName, targetPort) => {
    const service = config.services[serviceName];
    if (!service) {
        throw new Error(`Service "${serviceName}" does not exist.`);
    }
    const portBinding = service.ports.find(portBinding => portBinding.target === targetPort);
    if (!portBinding) {
        throw new Error(`Service "${serviceName}" has no target port ${portBinding}.`);
    }
    if (isInsideDockerContainer) {
        return `${serviceName}:${portBinding.target}`;
    }
    return `localhost:${portBinding.published}`;
};
//# sourceMappingURL=index.js.map