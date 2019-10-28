"use strict";
/* eslint-disable @typescript-eslint/ban-ts-ignore */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const RedisRunner1 = new index_1.default({ service: 'r1', image: 'some/image:123' });
const RedisRunner2 = new index_1.default({ service: 'r2', image: 'some/image:123' });
describe('RedisRunner', () => {
    it('should create unique instances', () => {
        expect(RedisRunner1).not.toBe(RedisRunner2);
        expect(RedisRunner1).toMatchSnapshot();
        expect(RedisRunner2).toMatchSnapshot();
    });
    it('should fail validation', () => {
        // @ts-ignore
        expect(() => new index_1.default({}).validateConfig()).toThrow(/service: Schema-key missing in config/);
    });
});
//# sourceMappingURL=index.spec.js.map