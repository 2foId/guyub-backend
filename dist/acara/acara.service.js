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
exports.AcaraService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const prisma_service_1 = require("../prisma/prisma.service");
const sorotan_config_1 = require("../sorotan/sorotan.config");
let AcaraService = class AcaraService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        if (!sorotan_config_1.KABUPATEN_DAFTAR.includes(dto.kabupatenKota)) {
            throw new common_1.BadRequestException('Kabupaten/kota tidak valid.');
        }
        const acara = await this.prisma.acara.create({
            data: {
                nama: dto.nama,
                deskripsi: dto.deskripsi,
                jenis: dto.jenis,
                lokasi: dto.lokasi,
                waktuMulai: new Date(dto.waktuMulai),
                waktuSelesai: dto.waktuSelesai ? new Date(dto.waktuSelesai) : undefined,
                foto: dto.foto,
                pembuatId: userId,
                kabupatenKota: dto.kabupatenKota,
                targetHadir: dto.targetHadir ?? 1,
            },
        });
        await this.prisma.acaraAbsensi.create({
            data: { acaraId: acara.id, userId, hadir: true },
        });
        return acara;
    }
    findAll(kabupaten) {
        if (kabupaten !== undefined && kabupaten !== '' && !sorotan_config_1.KABUPATEN_DAFTAR.includes(kabupaten)) {
            throw new common_1.BadRequestException('Kabupaten/kota tidak valid.');
        }
        return this.prisma.acara.findMany({
            where: {
                ...(kabupaten ? { kabupatenKota: kabupaten } : {}),
            },
            include: {
                pembuat: { select: { id: true, nama: true, avatarUrl: true } },
                _count: { select: { logistik: true, absensi: true } },
            },
            orderBy: { waktuMulai: 'asc' },
        });
    }
    async findOne(id) {
        const item = await this.prisma.acara.findUnique({
            where: { id },
            include: {
                pembuat: { select: { id: true, nama: true, avatarUrl: true } },
                logistik: true,
                absensi: { include: { user: { select: { id: true, nama: true, avatarUrl: true } } } },
            },
        });
        if (!item)
            throw new common_1.NotFoundException('Acara tidak ditemukan');
        return item;
    }
    async addLogistik(acaraId, dto) {
        await this.findOne(acaraId);
        return this.prisma.acaraLogistik.create({
            data: { acaraId, ...dto },
        });
    }
    async toggleLogistikDipenuhi(logistikId) {
        const item = await this.prisma.acaraLogistik.findUnique({ where: { id: logistikId } });
        if (!item)
            throw new common_1.NotFoundException('Item logistik tidak ditemukan');
        return this.prisma.acaraLogistik.update({
            where: { id: logistikId },
            data: { dipenuhi: !item.dipenuhi },
        });
    }
    async generateQr(acaraId, creatorId) {
        const acara = await this.findOne(acaraId);
        if (acara.pembuatId !== creatorId)
            throw new common_1.ForbiddenException('Hanya pembuat acara yang bisa membuat QR');
        return this.prisma.acara.update({
            where: { id: acaraId },
            data: { kodeQr: (0, crypto_1.randomUUID)(), kodeQrExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) },
            select: { kodeQr: true, kodeQrExpiresAt: true },
        });
    }
    async generateKodeAbsen(acaraId, creatorId) {
        const acara = await this.findOne(acaraId);
        if (acara.pembuatId !== creatorId)
            throw new common_1.ForbiddenException('Hanya penyelenggara yang bisa membuat kode absen');
        const kode = String((0, crypto_1.randomInt)(0, 10000)).padStart(4, '0');
        return this.prisma.acara.update({
            where: { id: acaraId },
            data: { kodeAbsen: kode },
            select: { kodeAbsen: true },
        });
    }
    async absen(acaraId, userId, kode) {
        const acara = await this.findOne(acaraId);
        if (!acara.kodeAbsen)
            throw new common_1.BadRequestException('Kode absen belum dibuat oleh penyelenggara');
        if (acara.kodeAbsen !== kode)
            throw new common_1.BadRequestException('Kode absen salah');
        const existing = await this.prisma.acaraAbsensi.findUnique({
            where: { acaraId_userId: { acaraId, userId } },
        });
        if (existing)
            return existing;
        return this.prisma.acaraAbsensi.create({
            data: { acaraId, userId, hadir: true },
        });
    }
};
exports.AcaraService = AcaraService;
exports.AcaraService = AcaraService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AcaraService);
//# sourceMappingURL=acara.service.js.map