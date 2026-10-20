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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const common_2 = require("@nestjs/common");
const level_1 = require("./level");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    findById(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async getLevel(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: { level: true, xpTotal: true, currency: true },
        });
        if (!user)
            throw new common_2.NotFoundException('Pengguna tidak ditemukan');
        return { ...(0, level_1.hitungLevel)(user.xpTotal), currency: user.currency };
    }
    updateTheme(id, theme) {
        return this.prisma.user.update({
            where: { id },
            data: { themePreference: theme },
            select: {
                id: true,
                nama: true,
                kontak: true,
                role: true,
                dusun: true,
                avatarUrl: true,
                bio: true,
                themePreference: true,
            },
        });
    }
    async findPublicProfile(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                nama: true,
                phone: true,
                avatarUrl: true,
                bio: true,
                dusun: true,
                role: true,
                keahlian: true,
                ketersediaan: true,
                createdAt: true,
            },
        });
        if (!user)
            throw new common_2.NotFoundException('Profil tidak ditemukan');
        return {
            ...user,
            phone: user.role === 'PENGGERAK' ? user.phone : null,
        };
    }
    async findMyProfile(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                nama: true,
                phone: true,
                avatarUrl: true,
                bio: true,
                dusun: true,
                role: true,
                onboardingDone: true,
                keahlian: true,
                ketersediaan: true,
                themePreference: true,
                kabupatenKota: true,
                createdAt: true,
                bingkaiAktifId: true,
                bingkaiDimiliki: {
                    include: { bingkai: true },
                },
            },
        });
        return user ? { ...user } : null;
    }
    async updateProfile(id, dto) {
        const { role: ignoredRole, ...profileFields } = dto;
        void ignoredRole;
        const currentUser = await this.prisma.user.findUnique({
            where: { id },
            select: { role: true },
        });
        if (!currentUser)
            throw new common_2.NotFoundException('Profil tidak ditemukan');
        const role = currentUser.role;
        if (role === 'PELAJAR' && dto.phone !== undefined) {
            throw new common_1.BadRequestException('Nomor WhatsApp hanya untuk Penggerak.');
        }
        const payload = {
            ...profileFields,
            phone: role === 'PELAJAR'
                ? null
                : dto.phone === undefined
                    ? undefined
                    : dto.phone === null
                        ? null
                        : dto.phone.startsWith('08')
                            ? `+62${dto.phone.slice(1)}`
                            : dto.phone,
        };
        const user = await this.prisma.user.update({
            where: { id },
            data: payload,
            select: {
                id: true,
                nama: true,
                phone: true,
                avatarUrl: true,
                bio: true,
                dusun: true,
                role: true,
                onboardingDone: true,
                keahlian: true,
                ketersediaan: true,
                themePreference: true,
                kabupatenKota: true,
                createdAt: true,
            },
        });
        return { ...user };
    }
    async saveOnboardingAge(id, age) {
        if (!Number.isInteger(age) || age < 13 || age > 30) {
            throw new common_1.BadRequestException('Umur harus antara 13 dan 30 tahun.');
        }
        const role = age <= 17 ? 'PELAJAR' : 'PENGGERAK';
        const result = await this.prisma.user.updateMany({
            where: { id, onboardingDone: false },
            data: {
                age,
                role,
                ...(role === 'PELAJAR' ? { phone: null, bidang: null } : {}),
            },
        });
        if (result.count !== 1)
            throw new common_1.BadRequestException('Onboarding sudah selesai.');
        return { age, role };
    }
    async saveOnboardingBidang(id, bidang) {
        const result = await this.prisma.user.updateMany({
            where: { id, role: 'PENGGERAK', onboardingDone: false },
            data: { bidang },
        });
        if (result.count !== 1) {
            throw new common_1.BadRequestException('Bidang hanya dapat dipilih oleh Penggerak saat onboarding.');
        }
        return { bidang };
    }
    async completeOnboarding(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: { age: true, role: true, bidang: true, onboardingDone: true },
        });
        if (!user || user.onboardingDone)
            throw new common_1.BadRequestException('Onboarding sudah selesai.');
        if (user.age === null)
            throw new common_1.BadRequestException('Umur wajib diisi sebelum menyelesaikan onboarding.');
        if (user.role === 'PENGGERAK' && !user.bidang) {
            throw new common_1.BadRequestException('Bidang wajib dipilih oleh Penggerak.');
        }
        const result = await this.prisma.user.updateMany({
            where: { id, onboardingDone: false, age: { not: null } },
            data: { onboardingDone: true },
        });
        if (result.count !== 1)
            throw new common_1.BadRequestException('Onboarding sudah selesai.');
        return this.findMyProfile(id);
    }
    updateAvatar(id, avatarUrl) {
        return this.prisma.user.update({
            where: { id },
            data: { avatarUrl },
            select: { id: true, nama: true, avatarUrl: true },
        });
    }
    async findNotes(authorId, targetUserId) {
        await this.findPublicProfile(targetUserId);
        return this.prisma.profileNote.findMany({ where: { authorId, targetUserId }, orderBy: { updatedAt: 'desc' } });
    }
    async createNote(authorId, targetUserId, isi) {
        await this.findPublicProfile(targetUserId);
        return this.prisma.profileNote.create({ data: { authorId, targetUserId, isi } });
    }
    async findUserRatings(userId) {
        const ratings = await this.prisma.umkmRating.findMany({
            where: { toUserId: userId },
            include: {
                fromUser: { select: { id: true, nama: true, avatarUrl: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        const now = new Date();
        const visible = await Promise.all(ratings.map(async (r) => {
            const count = await this.prisma.umkmRating.count({ where: { responseId: r.responseId } });
            const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
            return count >= 2 || r.createdAt <= fourteenDaysAgo;
        }));
        const visibleRatings = ratings.filter((_, i) => visible[i]);
        const jumlahUlasan = visibleRatings.length;
        const avgScore = jumlahUlasan > 0
            ? visibleRatings.reduce((sum, r) => sum + r.score, 0) / jumlahUlasan
            : 0;
        return {
            avgScore: Math.round(avgScore * 10) / 10,
            jumlahUlasan,
            ulasan: visibleRatings.slice(0, 5).map((r) => ({
                id: r.id,
                score: r.score,
                comment: r.comment,
                createdAt: r.createdAt,
                fromUser: r.fromUser,
            })),
        };
    }
    async deleteNote(authorId, targetUserId, noteId) {
        const note = await this.prisma.profileNote.findFirst({ where: { id: noteId, authorId, targetUserId } });
        if (!note)
            throw new common_2.NotFoundException('Catatan tidak ditemukan');
        return this.prisma.profileNote.delete({ where: { id: noteId } });
    }
    create(data) {
        return this.prisma.user.create({ data });
    }
    verifyEmail(id) {
        return this.prisma.user.update({
            where: { id },
            data: { emailVerifiedAt: new Date() },
        });
    }
    findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                nama: true,
                email: true,
                dusun: true,
                role: true,
                emailVerifiedAt: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map