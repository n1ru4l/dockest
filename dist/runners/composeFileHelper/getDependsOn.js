"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependsOn) => dependsOn.length > 0
    ? {
        depends_on: dependsOn.map(({ runnerConfig: { service } }) => service),
    }
    : {};
//# sourceMappingURL=getDependsOn.js.map