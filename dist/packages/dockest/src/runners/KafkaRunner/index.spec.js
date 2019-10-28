"use strict";
/* eslint-disable @typescript-eslint/ban-ts-ignore */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const ZooKeeperRunner_1 = __importDefault(require("../ZooKeeperRunner"));
const kafkaRunner1 = new index_1.default({
    dependsOn: [
        new ZooKeeperRunner_1.default({
            service: 'zk1',
            image: 'some/image:123',
        }),
    ],
    service: 'k1',
    image: 'some/image:123',
});
const kafkaRunner2 = new index_1.default({
    dependsOn: [
        new ZooKeeperRunner_1.default({
            service: 'zk2',
            image: 'some/image:123',
        }),
    ],
    service: 'k2',
    image: 'some/image:123',
});
describe('KafkaRunner', () => {
    it('should create unique instances', () => {
        expect(kafkaRunner1).not.toBe(kafkaRunner2);
        expect(kafkaRunner1).toMatchSnapshot();
        expect(kafkaRunner2).toMatchSnapshot();
    });
    it('should fail validation', () => {
        // @ts-ignore
        expect(() => new index_1.default({}).validateConfig()).toThrow(/service: Schema-key missing in config/);
    });
});
//# sourceMappingURL=index.spec.js.map