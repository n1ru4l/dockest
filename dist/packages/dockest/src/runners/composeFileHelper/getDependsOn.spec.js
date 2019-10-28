"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getDependsOn_1 = __importDefault(require("./getDependsOn"));
const index_1 = require("../index");
describe('getDependsOn', () => {
    it('should resolve service names from dependencies', () => {
        const depRunner1 = new index_1.RedisRunner({ service: 'redis1', image: 'some/image:123' });
        const depRunner2 = new index_1.RedisRunner({ service: 'redis2', image: 'some/image:123' });
        const depRunners = [depRunner1, depRunner2];
        const result = getDependsOn_1.default(depRunners);
        expect(result).toMatchSnapshot();
    });
});
//# sourceMappingURL=getDependsOn.spec.js.map