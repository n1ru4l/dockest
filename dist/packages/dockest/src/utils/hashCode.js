"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (str) => Array.from(str).reduce((hash, char) => (Math.imul(31, hash) + char.charCodeAt(0)) | 0, 0);
//# sourceMappingURL=hashCode.js.map