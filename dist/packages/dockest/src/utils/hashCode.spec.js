"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hashCode_1 = __importDefault(require("./hashCode"));
describe('hashCode', () => {
    describe('happy', () => {
        it('should generate valid hashCode', () => {
            const service = 'postgres1sequelize';
            const service2 = 'postgres1sequelize';
            const result = hashCode_1.default(service);
            const result2 = hashCode_1.default(service2);
            expect(result).toMatchSnapshot();
            expect(result).toEqual(result2);
        });
    });
});
//# sourceMappingURL=hashCode.spec.js.map