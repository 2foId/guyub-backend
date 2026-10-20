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
exports.AdminIklanController = exports.IklanController = void 0;
const common_1 = require("@nestjs/common");
const sorotan_service_1 = require("./sorotan.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const client_1 = require("@prisma/client");
let IklanController = class IklanController {
    constructor(sorotanService) {
        this.sorotanService = sorotanService;
    }
    createDraft(userId, dto) {
        return this.sorotanService.createDraft(userId, dto);
    }
    updateDraft(userId, iklanId, dto) {
        return this.sorotanService.updateDraft(iklanId, userId, dto);
    }
    ajukan(userId, iklanId) {
        return this.sorotanService.ajukan(iklanId, userId);
    }
    getMyIklan(userId) {
        return this.sorotanService.getMyIklan(userId);
    }
    getTayang(bidang) {
        return this.sorotanService.getTayang(bidang);
    }
    catatTayang(iklanId) {
        return this.sorotanService.catatTayang(iklanId);
    }
    catatKlik(iklanId) {
        return this.sorotanService.catatKlik(iklanId);
    }
};
exports.IklanController = IklanController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK, client_1.Role.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], IklanController.prototype, "createDraft", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK, client_1.Role.ADMIN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], IklanController.prototype, "updateDraft", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK, client_1.Role.ADMIN),
    (0, common_1.Post)(':id/ajukan'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], IklanController.prototype, "ajukan", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK, client_1.Role.ADMIN),
    (0, common_1.Get)('saya'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IklanController.prototype, "getMyIklan", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK, client_1.Role.ADMIN),
    (0, common_1.Get)('tayang'),
    __param(0, (0, common_1.Query)('bidang')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IklanController.prototype, "getTayang", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK, client_1.Role.ADMIN),
    (0, common_1.Post)('tayang/:id/tayang'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IklanController.prototype, "catatTayang", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK, client_1.Role.ADMIN),
    (0, common_1.Post)('tayang/:id/klik'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IklanController.prototype, "catatKlik", null);
exports.IklanController = IklanController = __decorate([
    (0, common_1.Controller)('iklan'),
    __metadata("design:paramtypes", [sorotan_service_1.SorotanService])
], IklanController);
let AdminIklanController = class AdminIklanController {
    constructor(sorotanService) {
        this.sorotanService = sorotanService;
    }
    getAdminIklan(status) {
        return this.sorotanService.getAdminIklan(status);
    }
    getAdminIklanDetail(iklanId) {
        return this.sorotanService.getAdminIklanDetail(iklanId);
    }
    keputusan(adminId, iklanId, dto) {
        return this.sorotanService.keputusan(iklanId, adminId, dto);
    }
};
exports.AdminIklanController = AdminIklanController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminIklanController.prototype, "getAdminIklan", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminIklanController.prototype, "getAdminIklanDetail", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.Post)(':id/keputusan'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AdminIklanController.prototype, "keputusan", null);
exports.AdminIklanController = AdminIklanController = __decorate([
    (0, common_1.Controller)('admin/iklan'),
    __metadata("design:paramtypes", [sorotan_service_1.SorotanService])
], AdminIklanController);
//# sourceMappingURL=sorotan.controller.js.map