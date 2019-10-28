"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
exports.default = (payload) => {
    try {
        fs_1.default.writeFileSync(`${process.cwd()}/dockest-error.json`, JSON.stringify(payload, null, 2));
    }
    catch (error) { } // Swallow any potential errors
};
//# sourceMappingURL=dumpError.js.map