"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const checkConnection_1 = require("./checkConnection");
const { acquireConnection } = checkConnection_1.testables;
const host = 'localhost';
const port = '1337';
jest.mock('net', () => ({
    createConnection: jest.fn(function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return this;
    }),
    on: jest.fn(function (event) {
        if (event === 'connect') {
            //
        }
        else if (event === 'error') {
            //
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return this;
    }),
}));
// TODO: Implement tests
describe.skip('acquireConnection', () => {
    it('should acquire connection', async () => {
        await acquireConnection(host, port);
        expect(net_1.default.createConnection).toHaveBeenCalled();
    });
});
//# sourceMappingURL=checkConnection.spec.js.map