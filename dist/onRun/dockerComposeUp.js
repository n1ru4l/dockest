"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa_1 = __importDefault(require("execa")); /* eslint-disable-line import/default */
const constants_1 = require("../constants");
const dockerComposeUp = (serviceNames) => {
    const command = ` \
              docker-compose \
              -f ${`${constants_1.GENERATED_COMPOSE_FILE_PATH}`} \
              up \
              --force-recreate \
              ---no-build \
              ${serviceNames.join(' ')} \
            `;
    return execa_1.default(command, { shell: true });
};
exports.default = dockerComposeUp;
//# sourceMappingURL=dockerComposeUp.js.map