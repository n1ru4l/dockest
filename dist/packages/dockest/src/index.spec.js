"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dockestExports = __importStar(require("./index"));
const { default: Dockest, runners } = dockestExports;
describe('Dockest', () => {
    it('should export the expected members', () => {
        expect(dockestExports).toMatchSnapshot();
    });
    it('should be initializable and expose the main run method', () => {
        const dockest = new Dockest({});
        dockest.attachRunners([
            new runners.GeneralPurposeRunner({
                service: '_',
                image: '_',
            }),
        ]);
        expect(dockest).toBeInstanceOf(Dockest);
        expect(dockest).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.spec.js.map