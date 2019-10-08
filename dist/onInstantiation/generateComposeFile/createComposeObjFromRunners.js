"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { keys } = Object;
const getDepComposeServices = (dependsOn) => dependsOn.reduce((composeServices, { runnerConfig: { service }, getComposeService }) => ({
    ...composeServices,
    [service]: getComposeService(),
}), {});
exports.default = (config, dockerComposeFileVersion) => {
    const composeObj = {
        version: dockerComposeFileVersion,
        services: {},
    };
    config.runners.forEach(runner => {
        const { runnerConfig: { service, dependsOn }, getComposeService, } = runner;
        const composeService = getComposeService();
        const depComposeServices = getDepComposeServices(dependsOn);
        composeObj.services = {
            ...composeObj.services,
            [service]: { ...composeService },
            ...depComposeServices,
        };
    });
    const servicesWithNetworks = keys(composeObj.services).filter(service => composeObj.services[service].networks !== undefined);
    if (servicesWithNetworks.length > 0) {
        composeObj.networks = servicesWithNetworks.reduce((networks, service) => ({
            ...networks,
            ...composeObj.services[service].networks,
        }), {});
    }
    const servicesWithVolumes = keys(composeObj.services).filter(service => composeObj.services[service].volumes !== undefined);
    if (servicesWithVolumes.length > 0) {
        composeObj.volumes = servicesWithVolumes.reduce((volumes, service) => ({
            ...volumes,
            ...composeObj.services[service].volumes,
        }), {});
    }
    return composeObj;
};
//# sourceMappingURL=createComposeObjFromRunners.js.map