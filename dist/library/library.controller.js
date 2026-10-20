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
exports.LibraryController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const client_1 = require("@prisma/client");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const create_citation_dto_1 = require("./dto/create-citation.dto");
const create_library_note_dto_1 = require("./dto/create-library-note.dto");
const update_library_note_dto_1 = require("./dto/update-library-note.dto");
const library_service_1 = require("./library.service");
const news_query_dto_1 = require("../pustaka/dto/news-query.dto");
const literasi_query_dto_1 = require("../pustaka/dto/literasi-query.dto");
const berita_service_1 = require("../pustaka/berita.service");
const libraryLinks = [
    {
        category: 'Jurnal',
        links: [
            { name: 'Google Scholar', url: 'https://scholar.google.com/' },
            { name: 'DOAJ', url: 'https://doaj.org/' },
        ],
    },
    {
        category: 'Buku',
        links: [{ name: 'Open Library', url: 'https://openlibrary.org/' }],
    },
    {
        category: 'Arsip',
        links: [{ name: 'Khastara Perpusnas', url: 'https://khastara.perpusnas.go.id/' }],
    },
    {
        category: 'Perpustakaan',
        links: [{ name: 'Perpusnas', url: 'https://perpusnas.go.id/' }],
    },
];
let LibraryController = class LibraryController {
    constructor(libraryService, beritaService) {
        this.libraryService = libraryService;
        this.beritaService = beritaService;
    }
    getLinks() {
        return libraryLinks;
    }
    getNews(userId, query) {
        return this.beritaService.search(userId, query);
    }
    listNotes(userId, page) {
        return this.libraryService.listNotes(userId, page);
    }
    createNote(userId, dto) {
        return this.libraryService.createNote(userId, dto);
    }
    updateNote(userId, id, dto) {
        return this.libraryService.updateNote(userId, id, dto);
    }
    deleteNote(userId, id) {
        return this.libraryService.deleteNote(userId, id);
    }
    createCitation(userId, dto) {
        return this.libraryService.createCitation(userId, dto);
    }
    listLocalRegions() {
        return this.libraryService.listLocalRegions();
    }
    cariLiterasi(userId, query) {
        return this.beritaService.searchLiterasi(userId, query);
    }
};
exports.LibraryController = LibraryController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PELAJAR, client_1.Role.ADMIN),
    (0, common_1.Get)('links'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "getLinks", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PELAJAR, client_1.Role.ADMIN),
    (0, common_1.Get)('berita'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, news_query_dto_1.NewsQueryDto]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "getNews", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PELAJAR, client_1.Role.ADMIN),
    (0, common_1.Get)('catatan'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "listNotes", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PELAJAR, client_1.Role.ADMIN),
    (0, common_1.Post)('catatan'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_library_note_dto_1.CreateLibraryNoteDto]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "createNote", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PELAJAR, client_1.Role.ADMIN),
    (0, common_1.Patch)('catatan/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_library_note_dto_1.UpdateLibraryNoteDto]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "updateNote", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PELAJAR, client_1.Role.ADMIN),
    (0, common_1.Delete)('catatan/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "deleteNote", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PELAJAR, client_1.Role.ADMIN),
    (0, common_1.Post)('sitasi'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_citation_dto_1.CreateCitationDto]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "createCitation", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PELAJAR, client_1.Role.ADMIN),
    (0, common_1.Get)('daerah'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "listLocalRegions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.PELAJAR, client_1.Role.ADMIN),
    (0, common_1.Get)('cari'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, literasi_query_dto_1.LiterasiQueryDto]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "cariLiterasi", null);
exports.LibraryController = LibraryController = __decorate([
    (0, common_1.Controller)('pustaka'),
    __metadata("design:paramtypes", [library_service_1.LibraryService,
        berita_service_1.BeritaService])
], LibraryController);
//# sourceMappingURL=library.controller.js.map