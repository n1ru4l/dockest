"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolveContainerId_1 = require("./resolveContainerId");
const testUtils_1 = __importStar(require("../../testUtils"));
const { getContainerId } = resolveContainerId_1.testables;
const { initializedRunners: { redisRunner }, execa, } = testUtils_1.default({});
jest.mock('execa', () => jest.fn(() => ({ stdout: testUtils_1.mockedExecaStdout })));
describe('getContainerId', () => {
    it('should work', async () => {
        const containerId = await getContainerId(redisRunner);
        expect(redisRunner.logger.debug).toMatchSnapshot();
        expect(execa).toMatchSnapshot();
        expect(containerId).toMatchSnapshot();
    });
});
//# sourceMappingURL=resolveContainerId.spec.js.map