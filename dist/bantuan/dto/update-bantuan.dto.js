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
exports.UpdateBantuanDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
let UpdateFutureDeadlineConstraint = class UpdateFutureDeadlineConstraint {
    validate(value) {
        return value === undefined || value === null || value === '' || new Date(value).getTime() > Date.now();
    }
    defaultMessage() {
        return 'Tenggat harus berada di masa depan.';
    }
};
UpdateFutureDeadlineConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'updateFutureDeadline', async: false })
], UpdateFutureDeadlineConstraint);
class UpdateBantuanDto {
}
exports.UpdateBantuanDto = UpdateBantuanDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], UpdateBantuanDto.prototype, "judul", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], UpdateBantuanDto.prototype, "deskripsi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.BantuanKategori),
    __metadata("design:type", String)
], UpdateBantuanDto.prototype, "kategori", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateBantuanDto.prototype, "latitude", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateBantuanDto.prototype, "longitude", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBantuanDto.prototype, "alamat", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.PreferensiRelawan, { message: 'Preferensi relawan tidak valid' }),
    __metadata("design:type", String)
], UpdateBantuanDto.prototype, "preferensiRelawan", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((_, value) => value !== undefined),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tenggat wajib diisi.' }),
    (0, class_validator_1.IsDateString)({}, { message: 'Tenggat wajib diisi.' }),
    (0, class_validator_1.Validate)(UpdateFutureDeadlineConstraint),
    __metadata("design:type", String)
], UpdateBantuanDto.prototype, "dibutuhkanSebelum", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateBantuanDto.prototype, "foto", void 0);
//# sourceMappingURL=update-bantuan.dto.js.map