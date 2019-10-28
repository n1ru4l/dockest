"use strict";
/* eslint-disable @typescript-eslint/ban-ts-ignore */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const ZooKeeperRunner1 = new index_1.default({ service: 'zk1', image: 'some/image:123' });
const ZooKeeperRunner2 = new index_1.default({ service: 'zk2', image: 'some/image:123' });
describe('ZooKeeperRunner', () => {
    it('should create unique instances', () => {
        expect(ZooKeeperRunner1).not.toBe(ZooKeeperRunner2);
        expect(ZooKeeperRunner1).toMatchSnapshot();
        expect(ZooKeeperRunner2).toMatchSnapshot();
    });
    it('should fail validation', () => {
        // @ts-ignore
        expect(() => new index_1.default({}).validateConfig()).toThrow(/service: Schema-key missing in config/);
    });
});
//# sourceMappingURL=index.spec.js.map