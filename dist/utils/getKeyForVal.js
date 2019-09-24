"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { keys } = Object;
exports.default = (haystack, needle) => keys(haystack).find(key => haystack[key] === needle);
//# sourceMappingURL=getKeyForVal.js.map