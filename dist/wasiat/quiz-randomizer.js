"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acakKuis = acakKuis;
const crypto_1 = require("crypto");
function acakKuis(kuis) {
    return kuis.map((question) => {
        if (question.opsi.length !== 3 || !Number.isInteger(question.jawabanBenar) || question.jawabanBenar < 0 || question.jawabanBenar > 2) {
            throw new Error('Setiap soal harus memiliki tepat 3 opsi dan jawaban benar berindeks 0–2.');
        }
        const order = [0, 1, 2];
        for (let index = order.length - 1; index > 0; index -= 1) {
            const swapIndex = (0, crypto_1.randomInt)(index + 1);
            [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
        }
        return {
            ...question,
            opsi: order.map((originalIndex) => question.opsi[originalIndex]),
            jawabanBenar: order.indexOf(question.jawabanBenar),
        };
    });
}
//# sourceMappingURL=quiz-randomizer.js.map