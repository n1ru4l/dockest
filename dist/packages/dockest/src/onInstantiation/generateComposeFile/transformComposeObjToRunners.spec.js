"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transformComposeObjToRunners_1 = __importDefault(require("./transformComposeObjToRunners"));
const testUtils_1 = __importDefault(require("../../testUtils"));
const composeObj_1 = require("../../../../../fixtures/composeObj");
const { createDockestConfig, initializedRunners } = testUtils_1.default({ realLoggers: true });
describe('transformComposeObjToRunners', () => {
    it('should detect conflict and prioritize attachedRunners', () => {
        const dockestConfig = createDockestConfig({
            runners: [initializedRunners.redisRunner],
            realLoggers: true,
        });
        const result = transformComposeObjToRunners_1.default(dockestConfig, composeObj_1.postgresAndRedis);
        expect(result).toMatchSnapshot();
    });
});
//# sourceMappingURL=transformComposeObjToRunners.spec.js.map