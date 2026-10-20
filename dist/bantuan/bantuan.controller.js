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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BantuanController = void 0;
const common_1 = require("@nestjs/common");
const bantuan_service_1 = require("./bantuan.service");
const create_bantuan_dto_1 = require("./dto/create-bantuan.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
const kesediaan_dto_1 = require("./dto/kesediaan.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const client_1 = require("@prisma/client");
const update_bantuan_dto_1 = require("./dto/update-bantuan.dto");
const batal_kesediaan_dto_1 = require("./dto/batal-kesediaan.dto");
const create_jam_kontribusi_dto_1 = require("./dto/create-jam-kontribusi.dto");
const konfirmasi_jam_kontribusi_dto_1 = require("./dto/konfirmasi-jam-kontribusi.dto");
let BantuanController = class BantuanController {
    constructor(bantuanService) {
        this.bantuanService = bantuanService;
    }
    findAllForMap(preferensi, kabupaten) {
        return this.bantuanService.findAllForMap(preferensi, kabupaten);
    }
    findAllForVerifikator(preferensi) {
        return this.bantuanService.findAllForVerifikator(preferensi);
    }
    findMyKesediaan(userId) {
        return this.bantuanService.findMyKesediaan(userId);
    }
    findOne(id) {
        return this.bantuanService.findOne(id);
    }
    create(userId, dto) {
        return this.bantuanService.create(userId, dto);
    }
    update(id, userId, dto) {
        return this.bantuanService.update(id, userId, dto);
    }
    verifikasi(id, verifikatorId, disetujui) {
        return this.bantuanService.verifikasi(id, verifikatorId, disetujui === 'true');
    }
    updateStatus(id, dto) {
        return this.bantuanService.updateStatus(id, dto.status);
    }
    nyatakanKesediaan(id, userId, dto) {
        return this.bantuanService.nyatakanKesediaan(id, userId, dto.catatan);
    }
    batalKesediaan(id, userId, dto) {
        return this.bantuanService.batalKesediaan(id, userId, dto);
    }
    tandaiSelesai(id, userId) {
        return this.bantuanService.selesai(id, userId);
    }
    ajukanJamKontribusi(id, penggerakId, dto) {
        return this.bantuanService.ajukanJamKontribusi(id, penggerakId, dto);
    }
    getJamKontribusi(id, userId) {
        return this.bantuanService.getJamKontribusi(id, userId);
    }
    konfirmasiJamKontribusi(id, pemintaId, dto) {
        return this.bantuanService.konfirmasiJamKontribusi(id, pemintaId, dto);
    }
    hapus(id, userId, role) {
        return this.bantuanService.hapus(id, userId, role);
    }
};
exports.BantuanController = BantuanController;
__decorate([
    (0, common_1.Get)('peta'),
    __param(0, (0, common_1.Query)('preferensi')),
    __param(1, (0, common_1.Query)('kabupaten')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BantuanController.prototype, "findAllForMap", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK, client_1.Role.ADMIN),
    (0, common_1.Get)('verifikasi'),
    __param(0, (0, common_1.Query)('preferensi')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BantuanController.prototype, "findAllForVerifikator", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('saya/kesediaan'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BantuanController.prototype, "findMyKesediaan", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BantuanController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_bantuan_dto_1.CreateBantuanDto]),
    __metadata("design:returntype", void 0)
], BantuanController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_bantuan_dto_1.UpdateBantuanDto]),
    __metadata("design:returntype", void 0)
], BantuanController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK, client_1.Role.ADMIN),
    (0, common_1.Patch)(':id/verifikasi'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Query)('disetujui')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], BantuanController.prototype, "verifikasi", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK, client_1.Role.ADMIN),
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", void 0)
], BantuanController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/kesediaan'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, kesediaan_dto_1.KesediaanDto]),
    __metadata("design:returntype", void 0)
], BantuanController.prototype, "nyatakanKesediaan", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/batal-kesediaan'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, batal_kesediaan_dto_1.BatalKesediaanDto]),
    __metadata("design:returntype", void 0)
], BantuanController.prototype, "batalKesediaan", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id/selesai'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BantuanController.prototype, "tandaiSelesai", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Post)(':id/jam'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_jam_kontribusi_dto_1.CreateJamKontribusiDto]),
    __metadata("design:returntype", void 0)
], BantuanController.prototype, "ajukanJamKontribusi", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id/jam'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BantuanController.prototype, "getJamKontribusi", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/jam/konfirmasi'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, konfirmasi_jam_kontribusi_dto_1.KonfirmasiJamKontribusiDto]),
    __metadata("design:returntype", void 0)
], BantuanController.prototype, "konfirmasiJamKontribusi", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], BantuanController.prototype, "hapus", null);
exports.BantuanController = BantuanController = __decorate([
    (0, common_1.Controller)('bantuan'),
    __metadata("design:paramtypes", [bantuan_service_1.BantuanService])
], BantuanController);
//# sourceMappingURL=bantuan.controller.js.map