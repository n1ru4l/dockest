"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
exports.default = async (runner) => {
    const command = ` \
    docker exec ${runner.containerId} \
      /bin/sh -c "ip -4 route list match 0/0 | awk '{print \\$3\\" host.docker.internal\\"}' >> /etc/hosts"
  `;
    await index_1.execa(command).catch(() => { });
};
//# sourceMappingURL=fixRunnerHostAccessOnLinux.js.map