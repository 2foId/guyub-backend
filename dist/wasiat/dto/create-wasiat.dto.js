"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWasiatDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateWasiatSoalDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'Pertanyaan harus berupa teks' }),
    (0, class_validator_1.MinLength)(1, { message: 'Pertanyaan wajib diisi' }),
    (0, class_validator_1.MaxLength)(200, { message: 'Pertanyaan maksimal 200 karakter' }),
    __metadata("design:type", String)
], CreateWasiatSoalDto.prototype, "pertanyaan", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'Setiap soal harus memiliki tepat 3 opsi' }),
    (0, class_validator_1.ArrayMinSize)(3, { message: 'Setiap soal harus memiliki tepat 3 opsi' }),
    (0, class_validator_1.ArrayMaxSize)(3, { message: 'Setiap soal harus memiliki tepat 3 opsi' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Opsi jawaban harus berupa teks' }),
    (0, class_validator_1.MinLength)(1, { each: true, message: 'Setiap opsi wajib diisi' }),
    (0, class_validator_1.MaxLength)(120, { each: true, message: 'Setiap opsi maksimal 120 karakter' }),
    __metadata("design:type", Array)
], CreateWasiatSoalDto.prototype, "opsi", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'Jawaban benar harus dipilih' }),
    (0, class_validator_1.Min)(0, { message: 'Indeks jawaban benar harus 0, 1, atau 2' }),
    (0, class_validator_1.Max)(2, { message: 'Indeks jawaban benar harus 0, 1, atau 2' }),
    __metadata("design:type", Number)
], CreateWasiatSoalDto.prototype, "jawabanBenar", void 0);
class CreateWasiatQuestDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'Judul quest harus berupa teks' }),
    (0, class_validator_1.MinLength)(1, { message: 'Judul quest wajib diisi' }),
    (0, class_validator_1.MaxLength)(80, { message: 'Judul quest maksimal 80 karakter' }),
    __metadata("design:type", String)
], CreateWasiatQuestDto.prototype, "judul", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Tujuan quest harus berupa teks' }),
    (0, class_validator_1.MinLength)(1, { message: 'Tujuan quest wajib diisi' }),
    (0, class_validator_1.MaxLength)(400, { message: 'Tujuan quest maksimal 400 karakter' }),
    __metadata("design:type", String)
], CreateWasiatQuestDto.prototype, "tujuan", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'Quest harus memiliki daftar soal' }),
    (0, class_validator_1.ArrayMinSize)(3, { message: 'Quest harus memiliki 3 sampai 10 soal' }),
    (0, class_validator_1.ArrayMaxSize)(10, { message: 'Quest harus memiliki 3 sampai 10 soal' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateWasiatSoalDto),
    __metadata("design:type", Array)
], CreateWasiatQuestDto.prototype, "kuis", void 0);
class CreateWasiatDto {
}
exports.CreateWasiatDto = CreateWasiatDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(20, { message: 'Judul maksimal 20 karakter.' }),
    __metadata("design:type", String)
], CreateWasiatDto.prototype, "judul", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.WasiatKategori),
    __metadata("design:type", String)
], CreateWasiatDto.prototype, "kategori", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(20),
    __metadata("design:type", String)
], CreateWasiatDto.prototype, "isi", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateWasiatDto.prototype, "poinKiat", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateWasiatDto.prototype, "foto", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Quest harus berupa daftar' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Minimal harus ada 1 quest' }),
    (0, class_validator_1.ArrayMaxSize)(5, { message: 'Maksimal 5 quest per wasiat' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateWasiatQuestDto),
    __metadata("design:type", Array)
], CreateWasiatDto.prototype, "quest", void 0);
//# sourceMappingURL=create-wasiat.dto.js.map