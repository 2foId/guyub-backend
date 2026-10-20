export declare const XP_BASE = 100;
export declare const XP_EXP = 1.5;
export declare const CURRENCY_BASE = 50;
export declare function xpUntukNaikKeLevel(level: number): number;
export declare function hitungLevel(xpTotal: number): {
    level: number;
    xpTotal: number;
    xpSaatIni: number;
    xpDibutuhkan: number;
    persen: number;
};
export declare function currencyUntukLevelBaru(level: number): number;
export declare function totalCurrencyUntukXp(xpTotal: number): number;
