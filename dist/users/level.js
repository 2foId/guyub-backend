"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CURRENCY_BASE = exports.XP_EXP = exports.XP_BASE = void 0;
exports.xpUntukNaikKeLevel = xpUntukNaikKeLevel;
exports.hitungLevel = hitungLevel;
exports.currencyUntukLevelBaru = currencyUntukLevelBaru;
exports.totalCurrencyUntukXp = totalCurrencyUntukXp;
exports.XP_BASE = 100;
exports.XP_EXP = 1.5;
exports.CURRENCY_BASE = 50;
function xpUntukNaikKeLevel(level) {
    return Math.round(exports.XP_BASE * Math.pow(level, exports.XP_EXP));
}
function hitungLevel(xpTotal) {
    let level = 1;
    let xpTersisa = Math.max(0, xpTotal);
    let xpDibutuhkan = xpUntukNaikKeLevel(level);
    while (xpTersisa >= xpDibutuhkan) {
        xpTersisa -= xpDibutuhkan;
        level += 1;
        xpDibutuhkan = xpUntukNaikKeLevel(level);
    }
    return {
        level,
        xpTotal: Math.max(0, xpTotal),
        xpSaatIni: xpTersisa,
        xpDibutuhkan,
        persen: Math.min(100, Math.floor((xpTersisa / xpDibutuhkan) * 100)),
    };
}
function currencyUntukLevelBaru(level) {
    return exports.CURRENCY_BASE * level * level;
}
function totalCurrencyUntukXp(xpTotal) {
    const { level } = hitungLevel(xpTotal);
    let currency = 0;
    for (let reachedLevel = 2; reachedLevel <= level; reachedLevel += 1) {
        currency += currencyUntukLevelBaru(reachedLevel);
    }
    return currency;
}
//# sourceMappingURL=level.js.map