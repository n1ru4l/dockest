"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assignRunnerSymbol_1 = __importDefault(require("./assignRunnerSymbol"));
const constants_1 = require("../constants");
const testUtils_1 = __importDefault(require("../testUtils"));
const { createDockestConfig, runners: { GeneralPurposeRunner }, } = testUtils_1.default({});
jest.mock('../Logger');
describe('assignRunnerSymbol', () => {
    it('should handle the base case and reset the symbols', () => {
        const runners = Array.from(Array(constants_1.LOG_SYMBOLS.length), (_, index) => new GeneralPurposeRunner({ service: `${index}`, image: '_' }));
        const dockestConfig = createDockestConfig({ runners });
        assignRunnerSymbol_1.default(dockestConfig);
        for (const runner of dockestConfig.runners) {
            expect(runner.logger.setRunnerSymbol).toMatchSnapshot();
        }
    });
});
//# sourceMappingURL=assignRunnerSymbol.spec.js.map