"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execaWrapper_1 = __importDefault(require("../utils/execaWrapper"));
const constants_1 = require("../constants");
exports.default = async () => {
    const command = `
    docker network create \
      --driver bridge \
      ${constants_1.BRIDGE_NETWORK_NAME}
  `;
    await execaWrapper_1.default(command);
};
//# sourceMappingURL=createBridgeNetwork.js.map