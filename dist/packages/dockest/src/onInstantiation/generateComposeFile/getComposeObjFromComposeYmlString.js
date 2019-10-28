"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const js_yaml_1 = require("js-yaml");
exports.default = (composeYml) => {
    const composeObj = js_yaml_1.safeLoad(composeYml);
    return composeObj;
};
//# sourceMappingURL=getComposeObjFromComposeYmlString.js.map