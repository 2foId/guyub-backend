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
exports.WasiatController = void 0;
const common_1 = require("@nestjs/common");
const wasiat_service_1 = require("./wasiat.service");
const create_wasiat_dto_1 = require("./dto/create-wasiat.dto");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const submit_langkah_dto_1 = require("./dto/submit-langkah.dto");
const feedback_progress_dto_1 = require("./dto/feedback-progress.dto");
const create_langkah_dto_1 = require("./dto/create-langkah.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const client_1 = require("@prisma/client");
let WasiatController = class WasiatController {
    constructor(wasiatService) {
        this.wasiatService = wasiatService;
    }
    findAll(kategori) {
        return this.wasiatService.findAll(kategori);
    }
    findMySaved(userId) {
        return this.wasiatService.findMySaved(userId);
    }
    findMyProgress(userId) {
        return this.wasiatService.findMyProgress(userId);
    }
    findOne(id) {
        return this.wasiatService.findOne(id);
    }
    findLangkah(id, userId) {
        return this.wasiatService.findLangkah(id, userId);
    }
    createLangkah(id, userId, dto) {
        return this.wasiatService.createLangkah(id, userId, dto);
    }
    submitLangkah(id, urutan, userId, dto) {
        return this.wasiatService.submitLangkah(id, Number(urutan), userId, dto.jawaban);
    }
    findWaitingFeedback(id, userId) {
        return this.wasiatService.findWaitingFeedback(id, userId);
    }
    postFeedback(id, userId, dto) {
        return this.wasiatService.postFeedback(id, userId, dto.progressId, dto.catatan);
    }
    create(userId, dto) {
        return this.wasiatService.create(userId, dto);
    }
    toggleSave(id, userId) {
        return this.wasiatService.toggleSave(id, userId);
    }
    addComment(id, userId, dto) {
        return this.wasiatService.addComment(id, userId, dto.isi, dto.rating);
    }
    deleteComment(id, commentId, userId, role) {
        return this.wasiatService.deleteComment(id, commentId, userId, role);
    }
};
exports.WasiatController = WasiatController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('kategori')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WasiatController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('saya/tersimpan'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WasiatController.prototype, "findMySaved", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('saya/progress'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WasiatController.prototype, "findMyProgress", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WasiatController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id/langkah'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], WasiatController.prototype, "findLangkah", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/langkah'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_langkah_dto_1.CreateLangkahDto]),
    __metadata("design:returntype", void 0)
], WasiatController.prototype, "createLangkah", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/langkah/:urutan/submit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('urutan')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, submit_langkah_dto_1.SubmitLangkahDto]),
    __metadata("design:returntype", void 0)
], WasiatController.prototype, "submitLangkah", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id/feedback/menunggu'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], WasiatController.prototype, "findWaitingFeedback", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/feedback'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, feedback_progress_dto_1.FeedbackProgressDto]),
    __metadata("design:returntype", void 0)
], WasiatController.prototype, "postFeedback", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_wasiat_dto_1.CreateWasiatDto]),
    __metadata("design:returntype", void 0)
], WasiatController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/simpan'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], WasiatController.prototype, "toggleSave", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/komentar'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], WasiatController.prototype, "addComment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id/komentar/:commentId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('commentId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(3, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], WasiatController.prototype, "deleteComment", null);
exports.WasiatController = WasiatController = __decorate([
    (0, common_1.Controller)('wasiat'),
    __metadata("design:paramtypes", [wasiat_service_1.WasiatService])
], WasiatController);
//# sourceMappingURL=wasiat.controller.js.map