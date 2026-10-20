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
exports.BantuanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const sorotan_config_1 = require("../sorotan/sorotan.config");
let BantuanService = class BantuanService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    matchesPreferensiRelawan(user, preferensi) {
        if (preferensi === client_1.PreferensiRelawan.SEMUA)
            return true;
        if (user.role !== 'PENGGERAK')
            return false;
        if (preferensi === client_1.PreferensiRelawan.BERPENGALAMAN) {
            return user.keahlian.length > 0;
        }
        return false;
    }
    async create(userId, dto) {
        if (!sorotan_config_1.KABUPATEN_DAFTAR.includes(dto.kabupatenKota)) {
            throw new common_1.BadRequestException('Kabupaten/kota tidak valid.');
        }
        return this.prisma.bantuanRequest.create({
            data: {
                ...dto,
                dibutuhkanSebelum: dto.dibutuhkanSebelum ? new Date(dto.dibutuhkanSebelum) : undefined,
                pembuatId: userId,
                kabupatenKota: dto.kabupatenKota,
                status: client_1.BantuanStatus.MENUNGGU_VERIFIKASI,
            },
        });
    }
    async update(id, userId, dto) {
        const item = await this.findOne(id);
        if (item.pembuatId !== userId)
            throw new common_1.ForbiddenException('Hanya pembuat permintaan yang dapat mengubahnya');
        return this.prisma.bantuanRequest.update({
            where: { id },
            data: {
                ...dto,
                dibutuhkanSebelum: dto.dibutuhkanSebelum ? new Date(dto.dibutuhkanSebelum) : undefined,
            },
        });
    }
    isValidPreferensi(preferensi) {
        if (preferensi === undefined)
            return;
        if (!Object.values(client_1.PreferensiRelawan).includes(preferensi)) {
            throw new common_1.BadRequestException('Preferensi relawan tidak valid');
        }
    }
    isValidKabupaten(kabupaten) {
        if (kabupaten === undefined || kabupaten === '')
            return;
        if (!sorotan_config_1.KABUPATEN_DAFTAR.includes(kabupaten)) {
            throw new common_1.BadRequestException('Kabupaten/kota tidak valid.');
        }
    }
    findAllForMap(preferensi, kabupaten) {
        this.isValidPreferensi(preferensi);
        this.isValidKabupaten(kabupaten);
        const where = {
            status: { not: client_1.BantuanStatus.MENUNGGU_VERIFIKASI },
        };
        if (kabupaten) {
            where.kabupatenKota = kabupaten;
        }
        return this.prisma.bantuanRequest.findMany({
            where,
            include: {
                pembuat: { select: { id: true, nama: true, avatarUrl: true, role: true, keahlian: true } },
                kesediaanBantu: {
                    where: { status: client_1.KesediaanStatus.AKTIF },
                    take: preferensi && preferensi !== client_1.PreferensiRelawan.SEMUA ? undefined : 5,
                    orderBy: { createdAt: 'asc' },
                    include: { user: { select: { id: true, nama: true, avatarUrl: true, role: true, keahlian: true } } },
                },
                _count: { select: { kesediaanBantu: { where: { status: client_1.KesediaanStatus.AKTIF } } } },
            },
            orderBy: { createdAt: 'desc' },
        }).then((items) => items.map((item) => {
            const safeMaker = { ...item.pembuat };
            const safeSupporters = item.kesediaanBantu.map((entry) => {
                return {
                    ...entry,
                    user: { ...entry.user },
                    cocokPreferensi: this.matchesPreferensiRelawan({ role: entry.user.role, keahlian: entry.user.keahlian ?? [] }, preferensi ?? item.preferensiRelawan),
                };
            });
            const hasMatchingSupporter = safeSupporters.some((entry) => entry.cocokPreferensi);
            const cocokPreferensi = !preferensi
                || preferensi === client_1.PreferensiRelawan.SEMUA
                || item.preferensiRelawan === preferensi
                || hasMatchingSupporter;
            return {
                ...item,
                pembuat: safeMaker,
                kesediaanBantu: safeSupporters,
                cocokPreferensi,
            };
        }).filter((item) => item.cocokPreferensi));
    }
    findAllForVerifikator(preferensi) {
        this.isValidPreferensi(preferensi);
        const where = undefined;
        return this.prisma.bantuanRequest.findMany({
            where,
            include: { pembuat: { select: { id: true, nama: true, email: true, role: true, keahlian: true } } },
            orderBy: { createdAt: 'desc' },
        }).then((items) => items.map((item) => {
            const safeMaker = { ...item.pembuat };
            const makerMatch = this.matchesPreferensiRelawan({ role: item.pembuat.role, keahlian: item.pembuat.keahlian ?? [] }, preferensi ?? item.preferensiRelawan);
            return {
                ...item,
                pembuat: safeMaker,
                cocokPreferensi: !preferensi
                    || preferensi === client_1.PreferensiRelawan.SEMUA
                    || makerMatch,
            };
        }));
    }
    async findOne(id) {
        const item = await this.prisma.bantuanRequest.findUnique({
            where: { id },
            include: {
                pembuat: { select: { id: true, nama: true, avatarUrl: true } },
                verifikator: { select: { id: true, nama: true } },
                kesediaanBantu: { include: { user: { select: { id: true, nama: true, avatarUrl: true } } } },
            },
        });
        if (!item)
            throw new common_1.NotFoundException('Permintaan bantuan tidak ditemukan');
        return item;
    }
    async verifikasi(id, verifikatorId, disetujui) {
        const item = await this.findOne(id);
        if (item.status !== client_1.BantuanStatus.MENUNGGU_VERIFIKASI) {
            throw new common_1.BadRequestException('Permintaan ini sudah diverifikasi sebelumnya');
        }
        return this.prisma.bantuanRequest.update({
            where: { id },
            data: {
                status: disetujui ? client_1.BantuanStatus.AKTIF : client_1.BantuanStatus.DITOLAK,
                verifikatorId,
                verifiedAt: new Date(),
            },
        });
    }
    async updateStatus(id, status) {
        await this.findOne(id);
        return this.prisma.bantuanRequest.update({
            where: { id },
            data: { status, selesaiAt: status === client_1.BantuanStatus.SELESAI ? new Date() : null },
        });
    }
    async selesai(id, userId) {
        const item = await this.findOne(id);
        if (item.pembuatId !== userId) {
            throw new common_1.BadRequestException('Hanya pembuat yang dapat menandai permintaan ini selesai');
        }
        if (item.status === client_1.BantuanStatus.SELESAI || item.status === client_1.BantuanStatus.DITOLAK) {
            throw new common_1.BadRequestException('Permintaan ini sudah selesai/ditolak');
        }
        return this.prisma.bantuanRequest.update({ where: { id }, data: { status: client_1.BantuanStatus.SELESAI, selesaiAt: new Date() } });
    }
    async ajukanJamKontribusi(bantuanId, penggerakId, dto) {
        const bantuan = await this.prisma.bantuanRequest.findUnique({
            where: { id: bantuanId },
            select: { id: true, status: true, pembuatId: true, createdAt: true, dibutuhkanSebelum: true },
        });
        if (!bantuan)
            throw new common_1.NotFoundException('Permintaan bantuan tidak ditemukan.');
        if (bantuan.status !== client_1.BantuanStatus.SELESAI) {
            throw new common_1.BadRequestException('Jam hanya dapat diajukan untuk bantuan yang selesai.');
        }
        if (bantuan.pembuatId === penggerakId) {
            throw new common_1.ForbiddenException('Peminta bantuan tidak dapat mengajukan jam kontribusi untuk bantuannya sendiri.');
        }
        const kesediaan = await this.prisma.kesediaanBantu.findUnique({
            where: { requestId_userId: { requestId: bantuanId, userId: penggerakId } },
            select: { status: true },
        });
        if (!kesediaan || kesediaan.status !== client_1.KesediaanStatus.AKTIF) {
            throw new common_1.ForbiddenException('Hanya Penggerak yang membantu bantuan ini yang dapat mengajukan jam.');
        }
        const penggerak = await this.prisma.user.findUnique({ where: { id: penggerakId }, select: { kabupatenKota: true } });
        if (!penggerak?.kabupatenKota) {
            throw new common_1.BadRequestException('Lengkapi kabupaten/kota pada profil sebelum mengajukan jam kontribusi.');
        }
        if (!bantuan.dibutuhkanSebelum) {
            throw new common_1.BadRequestException('Jadwal bantuan tidak tersedia untuk menghitung batas jam.');
        }
        const jadwalJam = Math.max(0, (bantuan.dibutuhkanSebelum.getTime() - bantuan.createdAt.getTime()) / (60 * 60 * 1000));
        const batasJam = jadwalJam + 2;
        if (dto.jumlahJam > batasJam + Number.EPSILON) {
            throw new common_1.BadRequestException(`Jumlah jam melebihi durasi jadwal bantuan ditambah 2 jam (maksimal ${batasJam.toFixed(1)} jam).`);
        }
        try {
            return await this.prisma.jamKontribusi.create({
                data: {
                    bantuanId,
                    penggerakId,
                    jumlahJam: new client_1.Prisma.Decimal(dto.jumlahJam),
                    catatan: dto.catatan?.trim() || null,
                    batasKonfirmasiAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
                select: {
                    id: true,
                    bantuanId: true,
                    jumlahJam: true,
                    catatan: true,
                    status: true,
                    diajukanAt: true,
                    batasKonfirmasiAt: true,
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new common_1.BadRequestException('Pengajuan jam untuk bantuan ini sudah pernah dibuat.');
            }
            throw error;
        }
    }
    async getJamKontribusi(bantuanId, userId) {
        const bantuan = await this.prisma.bantuanRequest.findUnique({
            where: { id: bantuanId },
            select: { id: true, pembuatId: true },
        });
        if (!bantuan)
            throw new common_1.NotFoundException('Permintaan bantuan tidak ditemukan.');
        const jam = await this.prisma.jamKontribusi.findUnique({ where: { bantuanId } });
        if (jam && jam.status === 'MENUNGGU' && jam.batasKonfirmasiAt <= new Date()) {
            await this.prisma.jamKontribusi.updateMany({
                where: { id: jam.id, status: 'MENUNGGU', batasKonfirmasiAt: { lte: new Date() } },
                data: { status: 'KEDALUWARSA' },
            });
        }
        const currentJam = jam
            ? await this.prisma.jamKontribusi.findUnique({ where: { id: jam.id } })
            : null;
        const isOwner = bantuan.pembuatId === userId;
        const isApplicant = currentJam?.penggerakId === userId;
        const activeSupport = !currentJam ? await this.prisma.kesediaanBantu.findFirst({
            where: { requestId: bantuanId, userId, status: client_1.KesediaanStatus.AKTIF },
            select: { id: true },
        }) : null;
        if (!isOwner && !isApplicant && !activeSupport) {
            throw new common_1.NotFoundException('Jam kontribusi tidak ditemukan.');
        }
        if (!currentJam)
            return null;
        const { penggerakId: _penggerakId, ...safeJam } = currentJam;
        return safeJam;
    }
    async konfirmasiJamKontribusi(bantuanId, pemintaId, dto) {
        if (dto.keputusan === 'DITOLAK' && !dto.alasanTolak?.trim()) {
            throw new common_1.BadRequestException('Alasan penolakan wajib diisi.');
        }
        const bantuan = await this.prisma.bantuanRequest.findUnique({
            where: { id: bantuanId },
            select: { id: true, pembuatId: true, status: true },
        });
        if (!bantuan)
            throw new common_1.NotFoundException('Permintaan bantuan tidak ditemukan.');
        if (bantuan.pembuatId !== pemintaId)
            throw new common_1.NotFoundException('Jam kontribusi tidak ditemukan.');
        if (bantuan.status !== client_1.BantuanStatus.SELESAI)
            throw new common_1.BadRequestException('Bantuan belum selesai.');
        const jam = await this.prisma.jamKontribusi.findUnique({ where: { bantuanId } });
        if (!jam)
            throw new common_1.NotFoundException('Pengajuan jam kontribusi tidak ditemukan.');
        if (jam.status === 'MENUNGGU' && jam.batasKonfirmasiAt <= new Date()) {
            await this.prisma.jamKontribusi.updateMany({
                where: { id: jam.id, status: 'MENUNGGU', batasKonfirmasiAt: { lte: new Date() } },
                data: { status: 'KEDALUWARSA' },
            });
            throw new common_1.BadRequestException('Batas konfirmasi telah lewat; pengajuan berstatus kedaluwarsa.');
        }
        if (jam.status !== 'MENUNGGU')
            throw new common_1.BadRequestException('Pengajuan jam ini sudah diproses.');
        const now = new Date();
        const updated = await this.prisma.jamKontribusi.updateMany({
            where: { id: jam.id, status: 'MENUNGGU', batasKonfirmasiAt: { gt: now } },
            data: {
                status: dto.keputusan,
                dikonfirmasiAt: now,
                alasanTolak: dto.keputusan === 'DITOLAK' ? dto.alasanTolak?.trim() : null,
            },
        });
        if (updated.count !== 1)
            throw new common_1.BadRequestException('Pengajuan jam ini sudah diproses atau kedaluwarsa.');
        return this.getJamKontribusi(bantuanId, pemintaId);
    }
    async hapus(id, userId, role) {
        const item = await this.findOne(id);
        if (item.status === client_1.BantuanStatus.AKTIF || item.status === client_1.BantuanStatus.DIPROSES || item.status === client_1.BantuanStatus.MENUNGGU_VERIFIKASI) {
            throw new common_1.BadRequestException('Hanya permintaan yang sudah selesai/ditolak yang bisa dihapus');
        }
        if (item.pembuatId !== userId && role !== 'ADMIN' && role !== 'PENGGERAK') {
            throw new common_1.ForbiddenException('Hanya pembuat atau admin/penggerak yang bisa menghapus permintaan ini');
        }
        await this.hapusFoto(item.foto);
        return this.prisma.bantuanRequest.delete({ where: { id } });
    }
    async hapusFoto(foto) {
        const { unlink } = await Promise.resolve().then(() => require('fs/promises'));
        const { basename, join } = await Promise.resolve().then(() => require('path'));
        const uploadsDir = join(process.cwd(), 'uploads');
        for (const url of foto) {
            const filename = basename(url);
            if (!filename || filename === '.' || filename === '..')
                continue;
            try {
                await unlink(join(uploadsDir, filename));
            }
            catch {
            }
        }
    }
    async nyatakanKesediaan(requestId, userId, catatan) {
        const request = await this.findOne(requestId);
        if (request.status !== client_1.BantuanStatus.AKTIF && request.status !== client_1.BantuanStatus.DIPROSES) {
            throw new common_1.BadRequestException('Permintaan ini belum/tidak lagi menerima bantuan');
        }
        const existing = await this.prisma.kesediaanBantu.findUnique({ where: { requestId_userId: { requestId, userId } } });
        if (existing) {
            throw new common_1.BadRequestException('Kamu sudah pernah membatalkan bantuan ini dan tidak bisa menawarkan bantuan lagi.');
        }
        const kesediaan = await this.prisma.kesediaanBantu.create({ data: { requestId, userId, catatan } });
        if (request.status === client_1.BantuanStatus.AKTIF) {
            await this.prisma.bantuanRequest.update({
                where: { id: requestId },
                data: { status: client_1.BantuanStatus.DIPROSES },
            });
        }
        return kesediaan;
    }
    findMyKesediaan(userId) {
        return this.prisma.kesediaanBantu.findMany({
            where: { userId },
            select: { requestId: true, status: true },
        });
    }
    async batalKesediaan(requestId, userId, dto) {
        const request = await this.findOne(requestId);
        const kesediaan = await this.prisma.kesediaanBantu.findUnique({
            where: { requestId_userId: { requestId, userId } },
        });
        if (!kesediaan || kesediaan.status !== client_1.KesediaanStatus.AKTIF) {
            throw new common_1.BadRequestException('Kesediaan membantu yang aktif tidak ditemukan');
        }
        return this.prisma.$transaction(async (transaction) => {
            await transaction.message.create({
                data: {
                    senderId: userId,
                    receiverId: request.pembuatId,
                    isi: `Pembatalan bantuan: ${dto.alasan.trim()}`,
                },
            });
            return transaction.kesediaanBantu.update({
                where: { id: kesediaan.id },
                data: { status: client_1.KesediaanStatus.DIBATALKAN, dibatalkanAt: new Date() },
            });
        });
    }
};
exports.BantuanService = BantuanService;
exports.BantuanService = BantuanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BantuanService);
//# sourceMappingURL=bantuan.service.js.map