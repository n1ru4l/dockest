"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { keys } = Object;
const getPorts = (ports) => ({
    ports: keys(ports).map(key => {
        const externalPort = key;
        const internalPort = ports[key];
        return `${externalPort}:${internalPort}`;
    }),
});
exports.default = getPorts;
//# sourceMappingURL=getPorts.js.map