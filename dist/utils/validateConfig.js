"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateTypes_1 = __importDefault(require("./validateTypes"));
const ConfigurationError_1 = __importDefault(require("../errors/ConfigurationError"));
exports.default = (schema, config) => {
    const failures = validateTypes_1.default(schema, config);
    const { build, image } = config;
    if (!image && !build) {
        failures.push(`"image" and "build" are invalid, at least one has to be present. (image: ${image}, build: ${build})`);
    }
    if (failures.length > 0) {
        throw new ConfigurationError_1.default(`${failures.join('\n')}`);
    }
};
//# sourceMappingURL=validateConfig.js.map