"use strict";
/* eslint-disable @typescript-eslint/ban-ts-ignore */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const postgresRunner1 = new index_1.default({
    service: 'pg1',
    image: 'some/image:123',
    database: '_',
    password: '_',
    username: '_',
});
const postgresRunner2 = new index_1.default({
    service: 'pg2',
    image: 'some/image:123',
    database: '_',
    password: '_',
    username: '_',
});
describe('PostgresRunner', () => {
    it('should create unique instances', () => {
        expect(postgresRunner1).not.toBe(postgresRunner2);
        expect(postgresRunner1).toMatchSnapshot();
        expect(postgresRunner2).toMatchSnapshot();
    });
    it('should fail validation', () => {
        // @ts-ignore
        expect(() => new index_1.default({ database: '_', password: '_', username: '_' }).validateConfig()).toThrow(/service: Schema-key missing in config/);
    });
});
//# sourceMappingURL=index.spec.js.map