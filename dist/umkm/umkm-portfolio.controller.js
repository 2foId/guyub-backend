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
exports.UmkmPortfolioController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const crypto_1 = require("crypto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const umkm_service_1 = require("./umkm.service");
const create_portfolio_dto_1 = require("./dto/create-portfolio.dto");
const client_1 = require("@prisma/client");
const portfolioExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
let UmkmPortfolioController = class UmkmPortfolioController {
    constructor(umkmService) {
        this.umkmService = umkmService;
    }
    async addPortfolio(responseId, userId, role, files, dto) {
        const beforeFile = files.beforeImage?.[0];
        const afterFile = files.afterImage?.[0];
        if (!beforeFile || !afterFile) {
            throw new common_1.BadRequestException('Kedua gambar (sebelum dan sesudah) wajib diunggah.');
        }
        return this.umkmService.addPortfolio(responseId, userId, role, {
            ...dto,
            beforeImageUrl: `/uploads/portofolio/${beforeFile.filename}`,
            afterImageUrl: `/uploads/portofolio/${afterFile.filename}`,
        });
    }
    async updatePortfolio(id, userId, dto) {
        return this.umkmService.updatePortfolio(id, userId, dto);
    }
    async deletePortfolio(id, userId) {
        return this.umkmService.deletePortfolio(id, userId);
    }
    async getVolunteerPortfolio(volunteerId, limit) {
        const take = limit ? Math.min(parseInt(limit, 10) || 12, 12) : 12;
        return this.umkmService.getVolunteerPortfolio(volunteerId, take);
    }
};
exports.UmkmPortfolioController = UmkmPortfolioController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Post)('responses/:id/portfolio'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 2, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/portofolio',
            filename: (_request, file, callback) => callback(null, `${(0, crypto_1.randomUUID)()}${(0, path_1.extname)(file.originalname).toLowerCase()}`),
        }),
        limits: { fileSize: 2 * 1024 * 1024 },
        fileFilter: (_request, file, callback) => {
            const extension = (0, path_1.extname)(file.originalname).toLowerCase();
            const valid = portfolioExtensions.has(extension);
            callback(null, valid);
        },
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(3, (0, common_1.UploadedFiles)()),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object, create_portfolio_dto_1.CreatePortfolioDto]),
    __metadata("design:returntype", Promise)
], UmkmPortfolioController.prototype, "addPortfolio", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Patch)('portfolios/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_portfolio_dto_1.UpdatePortfolioDto]),
    __metadata("design:returntype", Promise)
], UmkmPortfolioController.prototype, "updatePortfolio", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PENGGERAK),
    (0, common_1.Delete)('portfolios/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UmkmPortfolioController.prototype, "deletePortfolio", null);
__decorate([
    (0, common_1.Get)('volunteers/:id/portfolio'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UmkmPortfolioController.prototype, "getVolunteerPortfolio", null);
exports.UmkmPortfolioController = UmkmPortfolioController = __decorate([
    (0, common_1.Controller)('umkm'),
    __metadata("design:paramtypes", [umkm_service_1.UmkmService])
], UmkmPortfolioController);
//# sourceMappingURL=umkm-portfolio.controller.js.map