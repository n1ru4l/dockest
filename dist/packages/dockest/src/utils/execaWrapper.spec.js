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
const execaWrapper_1 = __importDefault(require("./execaWrapper"));
const testUtils_1 = __importStar(require("../testUtils"));
const { initializedRunners: { redisRunner }, Logger, execa, } = testUtils_1.default({});
jest.mock('execa', () => jest.fn(() => ({ stdout: testUtils_1.mockedExecaStdout })));
jest.mock('../Logger');
describe('execaWrapper', () => {
    const command = 'run some CLI command :please:';
    describe('with runner', () => {
        it('should work', async () => {
            const result = await execaWrapper_1.default(command, redisRunner);
            expect(redisRunner.logger.debug).toMatchSnapshot();
            expect(execa).toMatchSnapshot();
            expect(result).toMatchSnapshot();
        });
    });
    describe('without runner', () => {
        it('should work', async () => {
            const result = await execaWrapper_1.default(command);
            expect(Logger.debug).toMatchSnapshot();
            expect(execa).toMatchSnapshot();
            expect(result).toMatchSnapshot();
        });
    });
});
//# sourceMappingURL=execaWrapper.spec.js.map