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
exports.UmkmService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const sorotan_config_1 = require("../sorotan/sorotan.config");
let UmkmService = class UmkmService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { kabupatenKota: true } });
        const { kategori, ...rest } = dto;
        return this.prisma.umkmNeed.create({
            data: {
                ...rest,
                category: kategori,
                dibutuhkanSebelum: dto.dibutuhkanSebelum ? new Date(dto.dibutuhkanSebelum) : undefined,
                pemilikId: userId,
                kabupatenKota: user?.kabupatenKota ?? null,
            },
        });
    }
    findAll(status, category, kabupaten) {
        if (kabupaten !== undefined && kabupaten !== '' && !sorotan_config_1.KABUPATEN_DAFTAR.includes(kabupaten)) {
            throw new common_1.BadRequestException('Kabupaten/kota tidak valid.');
        }
        return this.prisma.umkmNeed.findMany({
            where: {
                ...(status ? { status } : {}),
                ...(category ? { category } : {}),
                ...(kabupaten ? { kabupatenKota: kabupaten } : {}),
            },
            include: {
                pemilik: { select: { id: true, nama: true, avatarUrl: true } },
                _count: { select: { responses: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const item = await this.prisma.umkmNeed.findUnique({
            where: { id },
            include: {
                pemilik: { select: { id: true, nama: true, avatarUrl: true } },
                responses: {
                    include: { penolong: { select: { id: true, nama: true, avatarUrl: true } } },
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        if (!item)
            throw new common_1.NotFoundException('Kebutuhan UMKM tidak ditemukan');
        return item;
    }
    async addResponse(needId, penolongId, pesan) {
        const item = await this.findOne(needId);
        const response = await this.prisma.umkmResponse.create({
            data: { needId, penolongId, pesan },
            include: { penolong: { select: { id: true, nama: true } } },
        });
        if (item.status === 'DIBUKA') {
            await this.prisma.umkmNeed.update({
                where: { id: needId },
                data: { status: 'DALAM_PROSES' },
            });
        }
        return response;
    }
    async updateStatus(id, userId, status) {
        const item = await this.findOne(id);
        if (item.pemilikId !== userId) {
            throw new common_1.ForbiddenException('Hanya pemilik usaha yang bisa mengubah status ini');
        }
        return this.prisma.umkmNeed.update({ where: { id }, data: { status } });
    }
    async hapus(id, userId, role) {
        const item = await this.findOne(id);
        if (item.pemilikId !== userId && role !== 'ADMIN' && role !== 'PENGGERAK') {
            throw new common_1.ForbiddenException('Hanya pemilik usaha, penggerak, atau admin yang bisa menghapus kebutuhan ini');
        }
        return this.prisma.umkmNeed.delete({ where: { id } });
    }
    async addPortfolio(responseId, userId, role, dto) {
        if (role !== client_1.Role.PENGGERAK) {
            throw new common_1.ForbiddenException('Hanya Penggerak yang bisa menambahkan portofolio.');
        }
        const response = await this.prisma.umkmResponse.findUnique({
            where: { id: responseId },
            include: { need: true, penolong: true },
        });
        if (!response)
            throw new common_1.NotFoundException('Respons tidak ditemukan.');
        if (response.penolongId !== userId) {
            throw new common_1.ForbiddenException('Hanya pemilik respons yang bisa menambahkan portofolio.');
        }
        if (response.need.status !== 'SELESAI') {
            throw new common_1.BadRequestException('Portofolio hanya bisa dibuat untuk kebutuhan yang sudah selesai.');
        }
        const existing = await this.prisma.umkmPortfolio.findUnique({ where: { responseId } });
        if (existing) {
            throw new common_1.BadRequestException('Respons ini sudah memiliki portofolio.');
        }
        return this.prisma.umkmPortfolio.create({
            data: {
                responseId,
                volunteerId: userId,
                umkmNeedId: response.needId,
                category: dto.category,
                title: dto.title,
                description: dto.description,
                beforeImageUrl: dto.beforeImageUrl,
                afterImageUrl: dto.afterImageUrl,
                isPublished: true,
            },
            include: {
                umkmNeed: { select: { id: true, namaUsaha: true, category: true } },
            },
        });
    }
    async updatePortfolio(id, userId, dto) {
        const portfolio = await this.prisma.umkmPortfolio.findUnique({ where: { id } });
        if (!portfolio)
            throw new common_1.NotFoundException('Portofolio tidak ditemukan.');
        if (portfolio.volunteerId !== userId) {
            throw new common_1.ForbiddenException('Hanya pemilik portofolio yang bisa mengubahnya.');
        }
        return this.prisma.umkmPortfolio.update({
            where: { id },
            data: dto,
            include: {
                umkmNeed: { select: { id: true, namaUsaha: true, category: true } },
            },
        });
    }
    async deletePortfolio(id, userId) {
        const portfolio = await this.prisma.umkmPortfolio.findUnique({ where: { id } });
        if (!portfolio)
            throw new common_1.NotFoundException('Portofolio tidak ditemukan.');
        if (portfolio.volunteerId !== userId) {
            throw new common_1.ForbiddenException('Hanya pemilik portofolio yang bisa menghapusnya.');
        }
        return this.prisma.umkmPortfolio.delete({ where: { id } });
    }
    async getVolunteerPortfolio(volunteerId, take) {
        return this.prisma.umkmPortfolio.findMany({
            where: { volunteerId, isPublished: true },
            include: {
                umkmNeed: { select: { id: true, namaUsaha: true, category: true } },
                response: { select: { id: true, pesan: true } },
            },
            orderBy: { createdAt: 'desc' },
            take,
        });
    }
    async addRating(responseId, userId, dto) {
        const response = await this.prisma.umkmResponse.findUnique({
            where: { id: responseId },
            include: { need: true, penolong: true },
        });
        if (!response)
            throw new common_1.NotFoundException('Respons tidak ditemukan.');
        if (response.need.status !== 'SELESAI') {
            throw new common_1.BadRequestException('Penilaian hanya bisa diberikan setelah pekerjaan selesai.');
        }
        if (response.penolongId !== userId && response.need.pemilikId !== userId) {
            throw new common_1.ForbiddenException('Hanya pihak yang terlibat dalam respons ini yang bisa menilai.');
        }
        const toUserId = response.penolongId === userId ? response.need.pemilikId : response.penolongId;
        const existing = await this.prisma.umkmRating.findUnique({
            where: { responseId_fromUserId: { responseId, fromUserId: userId } },
        });
        if (existing) {
            throw new common_1.BadRequestException('Penilaian sudah pernah dikirim.');
        }
        return this.prisma.umkmRating.create({
            data: {
                responseId,
                fromUserId: userId,
                toUserId,
                score: dto.score,
                comment: dto.comment ?? null,
            },
            include: {
                fromUser: { select: { id: true, nama: true, avatarUrl: true } },
            },
        });
    }
};
exports.UmkmService = UmkmService;
exports.UmkmService = UmkmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UmkmService);
//# sourceMappingURL=umkm.service.js.map