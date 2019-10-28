"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.createServiceDockerEventStream = (serviceName, eventEmitter) => {
    return rxjs_1.fromEventPattern(handler => {
        eventEmitter.addListener(serviceName, handler);
    }, handler => {
        eventEmitter.removeListener(serviceName, handler);
    }).pipe(operators_1.shareReplay());
};
//# sourceMappingURL=createServiceDockerEventStream.js.map