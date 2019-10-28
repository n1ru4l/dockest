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
const teardownSingle_1 = __importDefault(require("./teardownSingle"));
const testUtils_1 = __importStar(require("../testUtils"));
const { initializedRunners: { generalPurposeRunner }, execa, } = testUtils_1.default({});
generalPurposeRunner.containerId = 'mockContainerId';
jest.mock('execa', () => jest.fn(() => ({ stdout: testUtils_1.mockedExecaStdout })));
describe('teardownSingle', () => {
    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        execa.mockClear();
    });
    describe('happy', () => {
        it('should work', async () => {
            await teardownSingle_1.default(generalPurposeRunner);
            expect(execa).toMatchSnapshot();
        });
    });
    describe('sad', () => {
        it('should log and swallow teardown errors', async () => {
            const error = new Error('Unexpected teardown error');
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            execa.mockImplementation(() => {
                throw error;
            });
            await teardownSingle_1.default(generalPurposeRunner);
            expect(generalPurposeRunner.logger.info).toMatchSnapshot();
            expect(generalPurposeRunner.logger.error).toMatchSnapshot();
        });
    });
});
//# sourceMappingURL=teardownSingle.spec.js.map