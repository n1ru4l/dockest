"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execaWrapper_1 = __importDefault(require("../utils/execaWrapper"));
const constants_1 = require("../constants");
const dockerComposeUp = async (serviceNames) => {
    const command = ` \
              docker-compose \
              -f ${`${constants_1.GENERATED_COMPOSE_FILE_PATH}`} \
              up \
              --force-recreate \
              --build \
              --detach \
              ${serviceNames.join(' ')} \
            `;
    await execaWrapper_1.default(command);
};
exports.default = dockerComposeUp;
//# sourceMappingURL=dockerComposeUp.js.map