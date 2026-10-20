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
exports.CreateBantuanDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const class_validator_2 = require("class-validator");
const sorotan_config_1 = require("../../sorotan/sorotan.config");
let FutureDeadlineConstraint = class FutureDeadlineConstraint {
    validate(value) {
        return value === undefined || value === null || value === '' || new Date(value).getTime() > Date.now();
    }
    defaultMessage() {
        return 'Tenggat harus berada di masa depan.';
    }
};
FutureDeadlineConstraint = __decorate([
    (0, class_validator_2.ValidatorConstraint)({ name: 'futureDeadline', async: false })
], FutureDeadlineConstraint);
class CreateBantuanDto {
}
exports.CreateBantuanDto = CreateBantuanDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], CreateBantuanDto.prototype, "judul", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], CreateBantuanDto.prototype, "deskripsi", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.BantuanKategori),
    __metadata("design:type", String)
], CreateBantuanDto.prototype, "kategori", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBantuanDto.prototype, "latitude", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBantuanDto.prototype, "longitude", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBantuanDto.prototype, "alamat", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(sorotan_config_1.KABUPATEN_DAFTAR, { message: 'Kabupaten/kota tidak valid.' }),
    __metadata("design:type", String)
], CreateBantuanDto.prototype, "kabupatenKota", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.PreferensiRelawan, { message: 'Preferensi relawan tidak valid' }),
    __metadata("design:type", String)
], CreateBantuanDto.prototype, "preferensiRelawan", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tenggat wajib diisi.' }),
    (0, class_validator_1.IsDateString)({}, { message: 'Tenggat wajib diisi.' }),
    (0, class_validator_1.Validate)(FutureDeadlineConstraint),
    __metadata("design:type", String)
], CreateBantuanDto.prototype, "dibutuhkanSebelum", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateBantuanDto.prototype, "foto", void 0);
//# sourceMappingURL=create-bantuan.dto.js.map