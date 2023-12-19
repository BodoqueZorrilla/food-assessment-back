"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});
exports.default = httpsAgent;
//# sourceMappingURL=agent.js.map