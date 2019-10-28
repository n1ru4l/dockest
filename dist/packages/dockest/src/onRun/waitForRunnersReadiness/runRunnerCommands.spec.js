"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const runRunnerCommands_1 = __importDefault(require("./runRunnerCommands"));
const testUtils_1 = __importStar(require("../../testUtils"));
const { initializedRunners, execa } = testUtils_1.default({ withRunnerCommands: true });
const { values } = Object;
jest.mock('execa', () => jest.fn(() => ({ stdout: testUtils_1.mockedExecaStdout })));
describe('runRunnerCommands', () => {
    describe('test all runner types', () => {
        values(initializedRunners).forEach(runner => {
            it(`should work for ${runner.constructor.name}`, async () => {
                await runRunnerCommands_1.default(runner);
                expect(runner.logger.debug).toMatchSnapshot();
                expect(execa).toMatchSnapshot();
            });
        });
    });
});
//# sourceMappingURL=runRunnerCommands.spec.js.map