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
exports.UmkmController = void 0;
const common_1 = require("@nestjs/common");
const umkm_service_1 = require("./umkm.service");
const create_umkm_need_dto_1 = require("./dto/create-umkm-need.dto");
const create_response_dto_1 = require("./dto/create-response.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
const create_rating_dto_1 = require("./dto/create-rating.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const client_1 = require("@prisma/client");
let UmkmController = class UmkmController {
    constructor(umkmService) {
        this.umkmService = umkmService;
    }
    findAll(status, category, kabupaten) {
        return this.umkmService.findAll(status, category, kabupaten);
    }
    findOne(id) {
        return this.umkmService.findOne(id);
    }
    create(userId, dto) {
        return this.umkmService.create(userId, dto);
    }
    addResponse(id, userId, dto) {
        return this.umkmService.addResponse(id, userId, dto.pesan);
    }
    updateStatus(id, userId, dto) {
        return this.umkmService.updateStatus(id, userId, dto.status);
    }
    hapus(id, userId, role) {
        return this.umkmService.hapus(id, userId, role);
    }
    addRating(responseId, userId, dto) {
        return this.umkmService.addRating(responseId, userId, dto);
    }
};
exports.UmkmController = UmkmController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('kabupaten')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], UmkmController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UmkmController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_umkm_need_dto_1.CreateUmkmNeedDto]),
    __metadata("design:returntype", void 0)
], UmkmController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Post)(':id/respon'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_response_dto_1.CreateResponseDto]),
    __metadata("design:returntype", void 0)
], UmkmController.prototype, "addResponse", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_status_dto_1.UpdateUmkmStatusDto]),
    __metadata("design:returntype", void 0)
], UmkmController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], UmkmController.prototype, "hapus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Post)('responses/:id/rating'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_rating_dto_1.CreateUmkmRatingDto]),
    __metadata("design:returntype", void 0)
], UmkmController.prototype, "addRating", null);
exports.UmkmController = UmkmController = __decorate([
    (0, common_1.Controller)('umkm'),
    __metadata("design:paramtypes", [umkm_service_1.UmkmService])
], UmkmController);
//# sourceMappingURL=umkm.controller.js.map