"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.hashToken = hashToken;
const crypto_1 = require("crypto");
function generateToken() {
    const raw = (0, crypto_1.randomBytes)(32).toString('hex');
    const hash = (0, crypto_1.createHash)('sha256').update(raw).digest('hex');
    return { raw, hash };
}
function hashToken(raw) {
    return (0, crypto_1.createHash)('sha256').update(raw).digest('hex');
}
//# sourceMappingURL=token.util.js.map