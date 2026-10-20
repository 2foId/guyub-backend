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
exports.BingkaiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BingkaiService = class BingkaiService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listForUser(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { currency: true, bingkaiAktifId: true },
        });
        if (!user)
            throw new common_1.NotFoundException('Pengguna tidak ditemukan');
        const [allBingkai, owned] = await Promise.all([
            this.prisma.bingkaiProfil.findMany({ orderBy: { harga: 'asc' } }),
            this.prisma.kepemilikanBingkai.findMany({
                where: { userId },
                include: { bingkai: true },
            }),
        ]);
        const ownedSet = new Set(owned.map((o) => o.bingkaiId));
        const items = allBingkai.map((b) => ({
            id: b.id,
            kode: b.kode,
            nama: b.nama,
            harga: b.harga,
            gaya: b.gaya,
            dimiliki: ownedSet.has(b.id),
            dipasang: user.bingkaiAktifId === b.id,
        }));
        return { items, currency: user.currency };
    }
    async beli(userId, bingkaiId) {
        const [bingkai, user, existing] = await Promise.all([
            this.prisma.bingkaiProfil.findUnique({ where: { id: bingkaiId } }),
            this.prisma.user.findUnique({ where: { id: userId }, select: { currency: true } }),
            this.prisma.kepemilikanBingkai.findUnique({
                where: { userId_bingkaiId: { userId, bingkaiId } },
            }),
        ]);
        if (!bingkai)
            throw new common_1.NotFoundException('Bingkai tidak ditemukan.');
        if (!user)
            throw new common_1.NotFoundException('Pengguna tidak ditemukan.');
        if (existing)
            throw new common_1.BadRequestException('Bingkai ini sudah dimiliki.');
        if (user.currency < bingkai.harga) {
            throw new common_1.BadRequestException('Currency tidak cukup.');
        }
        await this.prisma.$transaction([
            this.prisma.kepemilikanBingkai.create({
                data: { userId, bingkaiId },
            }),
            this.prisma.user.update({
                where: { id: userId },
                data: { currency: { decrement: bingkai.harga } },
            }),
        ]);
        return { message: `Bingkai "${bingkai.nama}" dibeli.`, bingkaiId };
    }
    async pasang(userId, bingkaiId) {
        if (bingkaiId !== null) {
            const owned = await this.prisma.kepemilikanBingkai.findUnique({
                where: { userId_bingkaiId: { userId, bingkaiId } },
            });
            if (!owned)
                throw new common_1.BadRequestException('Bingkai ini tidak dimiliki.');
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: { bingkaiAktifId: bingkaiId },
        });
        return { message: bingkaiId ? 'Bingkai dipasang.' : 'Bingkai dilepas.', bingkaiAktifId: bingkaiId };
    }
};
exports.BingkaiService = BingkaiService;
exports.BingkaiService = BingkaiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BingkaiService);
//# sourceMappingURL=bingkai.service.js.map