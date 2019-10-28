"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createComposeObjFromRunners_1 = __importDefault(require("./createComposeObjFromRunners"));
const testUtils_1 = __importDefault(require("../../testUtils"));
const { createDockestConfig, initializedRunners } = testUtils_1.default({});
describe('createComposeObjFromRunners', () => {
    it('should create composeObj from single runner', () => {
        const dockestConfig = createDockestConfig({
            runners: [initializedRunners.postgresRunner],
        });
        const composeObj = createComposeObjFromRunners_1.default(dockestConfig, '3.0');
        expect(composeObj).toMatchSnapshot();
    });
    it('should create composeObj from all initialized runners', () => {
        const dockestConfig = createDockestConfig({
            runners: Object.values(initializedRunners),
        });
        const composeObj = createComposeObjFromRunners_1.default(dockestConfig, '3.0');
        expect(composeObj).toMatchSnapshot();
    });
});
//# sourceMappingURL=createComposeObjFromRunners.spec.js.map