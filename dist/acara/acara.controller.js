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
exports.AcaraController = void 0;
const common_1 = require("@nestjs/common");
const acara_service_1 = require("./acara.service");
const create_acara_dto_1 = require("./dto/create-acara.dto");
const create_logistik_dto_1 = require("./dto/create-logistik.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const absen_dto_1 = require("./dto/absen.dto");
const client_1 = require("@prisma/client");
let AcaraController = class AcaraController {
    constructor(acaraService) {
        this.acaraService = acaraService;
    }
    findAll(kabupaten) {
        return this.acaraService.findAll(kabupaten);
    }
    findOne(id) {
        return this.acaraService.findOne(id);
    }
    create(userId, dto) {
        return this.acaraService.create(userId, dto);
    }
    addLogistik(id, dto) {
        return this.acaraService.addLogistik(id, dto);
    }
    toggleLogistik(logistikId) {
        return this.acaraService.toggleLogistikDipenuhi(logistikId);
    }
    absen(id, userId, dto) {
        return this.acaraService.absen(id, userId, dto.kode);
    }
    generateKodeAbsen(id, creatorId) {
        return this.acaraService.generateKodeAbsen(id, creatorId);
    }
    generateQr(id, creatorId) {
        return this.acaraService.generateQr(id, creatorId);
    }
};
exports.AcaraController = AcaraController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('kabupaten')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcaraController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcaraController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_acara_dto_1.CreateAcaraDto]),
    __metadata("design:returntype", void 0)
], AcaraController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Post)(':id/logistik'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_logistik_dto_1.CreateLogistikDto]),
    __metadata("design:returntype", void 0)
], AcaraController.prototype, "addLogistik", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Patch)('logistik/:logistikId/toggle'),
    __param(0, (0, common_1.Param)('logistikId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcaraController.prototype, "toggleLogistik", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Post)(':id/absen'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, absen_dto_1.AbsenDto]),
    __metadata("design:returntype", void 0)
], AcaraController.prototype, "absen", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Post)(':id/kode-absen'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AcaraController.prototype, "generateKodeAbsen", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Post)(':id/qr'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AcaraController.prototype, "generateQr", null);
exports.AcaraController = AcaraController = __decorate([
    (0, common_1.Controller)('acara'),
    __metadata("design:paramtypes", [acara_service_1.AcaraService])
], AcaraController);
//# sourceMappingURL=acara.controller.js.map