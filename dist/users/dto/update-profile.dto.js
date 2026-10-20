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
exports.UpdateProfileDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class UpdateProfileDto {
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'Nama harus lebih atau sama dengan 3 karakter.' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Nama tidak boleh lebih dari 20 karakter.' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "nama", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.trim() || null : value),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?:08[0-9]{7,12}|\+62[0-9]{8,13})$/, {
        message: 'Nomor WhatsApp harus diawali 08 atau +62 dan berisi 9 sampai 15 digit.',
    }),
    __metadata("design:type", Object)
], UpdateProfileDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(280),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "bio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "avatarUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Keahlian harus berupa daftar' }),
    (0, class_validator_1.ArrayMaxSize)(10, { message: 'Keahlian maksimal 10 item' }),
    (0, class_validator_1.IsEnum)(client_1.SkillCategory, { each: true, message: 'Setiap keahlian harus kategori yang valid' }),
    (0, class_transformer_1.Transform)(({ value }) => Array.isArray(value)
        ? [...new Set(value.map((item) => typeof item === 'string' ? item.trim().replace(/\s+/g, ' ') : item))]
        : value),
    __metadata("design:type", Array)
], UpdateProfileDto.prototype, "keahlian", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200, { message: 'Ketersediaan maksimal 200 karakter' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "ketersediaan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100, { message: 'Kabupaten/kota maksimal 100 karakter' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "kabupatenKota", void 0);
//# sourceMappingURL=update-profile.dto.js.map