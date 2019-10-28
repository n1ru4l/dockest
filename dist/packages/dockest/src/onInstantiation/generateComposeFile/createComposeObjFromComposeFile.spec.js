"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const createComposeObjFromComposeFile_1 = __importDefault(require("./createComposeObjFromComposeFile"));
describe('createComposeObjFromComposeFile', () => {
    const nodeProcessMock = {
        cwd: jest.fn(() => path_1.default.join(process.cwd(), 'fixtures')),
    };
    beforeEach(() => {
        nodeProcessMock.cwd.mockClear();
    });
    it('should create composeObj from single service Compose File', () => {
        const composeFile = 'docker-compose-single-redis.yml';
        const composeObj = createComposeObjFromComposeFile_1.default([composeFile], nodeProcessMock);
        expect(composeObj).toMatchSnapshot();
    });
    it('should create composeObj from complicated Compose File', () => {
        const composeFile = 'docker-compose-complicated.yml';
        const composeObj = createComposeObjFromComposeFile_1.default([composeFile], nodeProcessMock);
        expect(composeObj).toMatchSnapshot();
    });
    describe('multiple Compose Files', () => {
        it('should create composeObj from multiple Compose Files', () => {
            const composeFiles = ['docker-compose-single-redis.yml', 'docker-compose-single-postgres.yml'];
            const composeObj = createComposeObjFromComposeFile_1.default(composeFiles, nodeProcessMock);
            expect(composeObj).toMatchSnapshot();
        });
        it('should merge conflicting names', () => {
            const composeFiles = ['docker-compose-single-redis.yml', 'docker-compose-single-redis-duplicate.yml'];
            const composeObj = createComposeObjFromComposeFile_1.default(composeFiles, nodeProcessMock);
            expect(composeObj).toMatchSnapshot();
        });
    });
});
//# sourceMappingURL=createComposeObjFromComposeFile.spec.js.map