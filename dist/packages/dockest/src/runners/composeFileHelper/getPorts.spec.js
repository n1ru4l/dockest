"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getPorts_1 = __importDefault(require("./getPorts"));
describe('getPorts', () => {
    it('should properly map ports', () => {
        const ports = {
            1000: '2000',
            1001: '2001',
            1002: '2002',
            anyString: 'works',
        };
        const result = getPorts_1.default(ports);
        expect(result).toMatchSnapshot();
    });
});
// TODO: Improve test coverage
//# sourceMappingURL=getPorts.spec.js.map