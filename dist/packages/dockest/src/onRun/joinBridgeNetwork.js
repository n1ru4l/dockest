"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execaWrapper_1 = __importDefault(require("../utils/execaWrapper"));
const constants_1 = require("../constants");
exports.default = async (containerId, alias) => {
    const command = `
    docker network connect \
      ${constants_1.BRIDGE_NETWORK_NAME} \
      ${alias ? `--alias ${alias}` : ''} \
      ${containerId}
  `;
    await execaWrapper_1.default(command);
};
//# sourceMappingURL=joinBridgeNetwork.js.map