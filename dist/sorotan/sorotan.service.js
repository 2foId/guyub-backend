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
exports.SorotanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const sorotan_config_1 = require("./sorotan.config");
const client_1 = require("@prisma/client");
const AVATAR_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const AVATAR_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
function isValidBidang(value) {
    return sorotan_config_1.BIDANG_DAFTAR.includes(value);
}
function isValidKabupaten(value) {
    return sorotan_config_1.KABUPATEN_DAFTAR.includes(value);
}
function isAktif(status) {
    return (status === client_1.IklanStatus.MENUNGGU ||
        status === client_1.IklanStatus.DISETUJUI ||
        status === client_1.IklanStatus.DRAFT);
}
function isBerjalan(status, now) {
    if (status !== client_1.IklanStatus.DISETUJUI)
        return false;
    return false;
}
let SorotanService = class SorotanService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createDraft(userId, dto) {
        const { judul, deskripsi, bidang, kabupatenKota } = dto;
        if (!judul || judul.trim().length === 0) {
            throw new common_1.BadRequestException('Judul wajib diisi.');
        }
        if (judul.trim().length > sorotan_config_1.SOROTAN_CONFIG.JUDUL_MAX) {
            throw new common_1.BadRequestException(`Judul maksimal ${sorotan_config_1.SOROTAN_CONFIG.JUDUL_MAX} karakter.`);
        }
        if (!deskripsi || deskripsi.trim().length === 0) {
            throw new common_1.BadRequestException('Deskripsi wajib diisi.');
        }
        if (deskripsi.trim().length > sorotan_config_1.SOROTAN_CONFIG.DESKRIPSI_MAX) {
            throw new common_1.BadRequestException(`Deskripsi maksimal ${sorotan_config_1.SOROTAN_CONFIG.DESKRIPSI_MAX} karakter.`);
        }
        if (!isValidBidang(bidang)) {
            throw new common_1.BadRequestException('Bidang tidak valid.');
        }
        if (!isValidKabupaten(kabupatenKota)) {
            throw new common_1.BadRequestException('Kabupaten/Kota tidak valid.');
        }
        const iklan = await this.prisma.iklan.create({
            data: {
                pemilikId: userId,
                judul: judul.trim(),
                deskripsi: deskripsi.trim(),
                bidang,
                kabupatenKota,
                status: client_1.IklanStatus.DRAFT,
            },
        });
        return iklan;
    }
    async updateDraft(iklanId, userId, dto) {
        const iklan = await this.prisma.iklan.findUnique({
            where: { id: iklanId },
        });
        if (!iklan)
            throw new common_1.NotFoundException('Iklan tidak ditemukan.');
        if (iklan.pemilikId !== userId) {
            throw new common_1.ForbiddenException('Iklan ini bukan milik Anda.');
        }
        if (iklan.status !== client_1.IklanStatus.DRAFT) {
            throw new common_1.BadRequestException('Hanya iklan dengan status DRAFT yang dapat diubah.');
        }
        const updateData = {};
        if (dto.judul !== undefined) {
            if (!dto.judul || dto.judul.trim().length === 0) {
                throw new common_1.BadRequestException('Judul wajib diisi.');
            }
            if (dto.judul.trim().length > sorotan_config_1.SOROTAN_CONFIG.JUDUL_MAX) {
                throw new common_1.BadRequestException(`Judul maksimal ${sorotan_config_1.SOROTAN_CONFIG.JUDUL_MAX} karakter.`);
            }
            updateData.judul = dto.judul.trim();
        }
        if (dto.deskripsi !== undefined) {
            if (!dto.deskripsi || dto.deskripsi.trim().length === 0) {
                throw new common_1.BadRequestException('Deskripsi wajib diisi.');
            }
            if (dto.deskripsi.trim().length > sorotan_config_1.SOROTAN_CONFIG.DESKRIPSI_MAX) {
                throw new common_1.BadRequestException(`Deskripsi maksimal ${sorotan_config_1.SOROTAN_CONFIG.DESKRIPSI_MAX} karakter.`);
            }
            updateData.deskripsi = dto.deskripsi.trim();
        }
        if (dto.bidang !== undefined) {
            if (!isValidBidang(dto.bidang)) {
                throw new common_1.BadRequestException('Bidang tidak valid.');
            }
            updateData.bidang = dto.bidang;
        }
        if (dto.kabupatenKota !== undefined) {
            if (!isValidKabupaten(dto.kabupatenKota)) {
                throw new common_1.BadRequestException('Kabupaten/Kota tidak valid.');
            }
            updateData.kabupatenKota = dto.kabupatenKota;
        }
        if (dto.fotoUrl !== undefined) {
            updateData.fotoUrl = dto.fotoUrl;
        }
        return this.prisma.iklan.update({
            where: { id: iklanId },
            data: updateData,
        });
    }
    async ajukan(iklanId, userId) {
        const [iklan, user, aktifLain] = await Promise.all([
            this.prisma.iklan.findUnique({ where: { id: iklanId } }),
            this.prisma.user.findUnique({ where: { id: userId }, select: { currency: true } }),
            this.prisma.iklan.findFirst({
                where: {
                    pemilikId: userId,
                    status: {
                        in: [client_1.IklanStatus.MENUNGGU, client_1.IklanStatus.DISETUJUI, client_1.IklanStatus.DRAFT],
                    },
                    NOT: { id: iklanId },
                },
            }),
        ]);
        if (!iklan)
            throw new common_1.NotFoundException('Iklan tidak ditemukan.');
        if (iklan.pemilikId !== userId) {
            throw new common_1.ForbiddenException('Iklan ini bukan milik Anda.');
        }
        if (iklan.status !== client_1.IklanStatus.DRAFT) {
            throw new common_1.BadRequestException('Hanya iklan DRAFT yang dapat diajukan.');
        }
        if (!user)
            throw new common_1.NotFoundException('Pengguna tidak ditemukan.');
        if (user.currency < sorotan_config_1.SOROTAN_CONFIG.HARGA_PAKET) {
            throw new common_1.BadRequestException('Currency tidak cukup.');
        }
        if (aktifLain) {
            throw new common_1.BadRequestException('Anda sudah memiliki iklan aktif. Hapus atau tarik iklan lain sebelum mengajukan baru.');
        }
        return this.prisma.$transaction(async (tx) => {
            await tx.logTransaksiIklan.create({
                data: {
                    iklanId,
                    pemilikId: userId,
                    jumlah: sorotan_config_1.SOROTAN_CONFIG.HARGA_PAKET,
                    tipe: client_1.TransaksiIklanTipe.BELI,
                },
            });
            await tx.user.update({
                where: { id: userId },
                data: { currency: { decrement: sorotan_config_1.SOROTAN_CONFIG.HARGA_PAKET } },
            });
            return tx.iklan.update({
                where: { id: iklanId },
                data: { status: client_1.IklanStatus.MENUNGGU },
            });
        });
    }
    async getMyIklan(userId) {
        return this.prisma.iklan.findMany({
            where: { pemilikId: userId },
            orderBy: { dibuatAt: 'desc' },
            include: {
                _count: {
                    select: { moderasi: true },
                },
            },
        });
    }
    async getTayang(bidang) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const where = {
            status: client_1.IklanStatus.DISETUJUI,
            mulaiAt: { lte: today },
            berakhirAt: { gte: today },
        };
        if (bidang && isValidBidang(bidang)) {
            where.bidang = bidang;
        }
        const iklanList = await this.prisma.iklan.findMany({
            where,
            include: {
                tayangan: {
                    where: { tanggal: today },
                },
            },
            orderBy: { dibuatAt: 'asc' },
        });
        for (const iklan of iklanList) {
            const tayanganHariIni = iklan.tayangan[0];
            const tayangSudah = tayanganHariIni ? tayanganHariIni.tayang : 0;
            if (tayangSudah >= iklan.kuotaHarian)
                continue;
            const pemilik = await this.prisma.user.findUnique({
                where: { id: iklan.pemilikId },
                select: { id: true, nama: true, kabupatenKota: true },
            });
            return {
                id: iklan.id,
                judul: iklan.judul,
                deskripsi: iklan.deskripsi,
                bidang: iklan.bidang,
                kabupatenKota: iklan.kabupatenKota,
                fotoUrl: iklan.fotoUrl,
                pemilik: {
                    id: pemilik?.id,
                    nama: pemilik?.nama,
                    kabupatenKota: pemilik?.kabupatenKota,
                },
                kuotaHarian: iklan.kuotaHarian,
                tayangHariIni: tayangSudah,
            };
        }
        return null;
    }
    async catatTayang(iklanId) {
        const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        return this.prisma.tayanganIklan.upsert({
            where: { iklanId_tanggal: { iklanId, tanggal: today } },
            create: { iklanId, tanggal: today, tayang: 1 },
            update: { tayang: { increment: 1 } },
        });
    }
    async catatKlik(iklanId) {
        const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        return this.prisma.tayanganIklan.upsert({
            where: { iklanId_tanggal: { iklanId, tanggal: today } },
            create: { iklanId, tanggal: today, klik: 1 },
            update: { klik: { increment: 1 } },
        });
    }
    async getAdminIklan(status) {
        const where = {};
        if (status)
            where.status = status;
        return this.prisma.iklan.findMany({
            where,
            include: {
                pemilik: {
                    select: { id: true, nama: true, phone: true, kabupatenKota: true, dusun: true },
                },
                moderasi: {
                    orderBy: { createdAt: 'desc' },
                },
            },
            orderBy: { dibuatAt: 'desc' },
        });
    }
    async getAdminIklanDetail(iklanId) {
        const iklan = await this.prisma.iklan.findUnique({
            where: { id: iklanId },
            include: {
                pemilik: {
                    select: { id: true, nama: true, phone: true, kabupatenKota: true, dusun: true, role: true },
                },
                moderasi: {
                    include: {
                        admin: {
                            select: { id: true, nama: true },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                },
                transaksi: {
                    orderBy: { createdAt: 'desc' },
                },
                tayangan: {
                    orderBy: { tanggal: 'desc' },
                    take: 7,
                },
            },
        });
        if (!iklan)
            throw new common_1.NotFoundException('Iklan tidak ditemukan.');
        return iklan;
    }
    async keputusan(iklanId, adminId, dto) {
        const iklan = await this.prisma.iklan.findUnique({
            where: { id: iklanId },
            include: { pemilik: true },
        });
        if (!iklan)
            throw new common_1.NotFoundException('Iklan tidak ditemukan.');
        if (iklan.pemilikId === adminId) {
            throw new common_1.ForbiddenException('Admin tidak boleh memoderasi iklan miliknya sendiri.');
        }
        const keputusan = dto.keputusan;
        if (!Object.values(client_1.IklanKeputusan).includes(keputusan)) {
            throw new common_1.BadRequestException('Keputusan tidak valid.');
        }
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tigaHariLagi = new Date(tomorrow);
        tigaHariLagi.setDate(tigaHariLagi.getDate() + sorotan_config_1.SOROTAN_CONFIG.DURASI_HARI);
        let updateData = {
            status: client_1.IklanStatus.DRAFT,
        };
        let message = '';
        if (keputusan === client_1.IklanKeputusan.SETUJUI) {
            updateData = {
                status: client_1.IklanStatus.DISETUJUI,
                mulaiAt: tomorrow,
                berakhirAt: tigaHariLagi,
            };
            message = 'Iklan disetujui.';
        }
        else if (keputusan === client_1.IklanKeputusan.TOLAK) {
            if (!dto.alasan || dto.alasan.trim().length === 0) {
                throw new common_1.BadRequestException('Alasan wajib diisi untuk penolakan.');
            }
            updateData = {
                status: client_1.IklanStatus.DITOLAK,
                alasanTolak: dto.alasan.trim(),
            };
            await this.prisma.$transaction([
                this.prisma.logTransaksiIklan.create({
                    data: {
                        iklanId,
                        pemilikId: iklan.pemilikId,
                        jumlah: sorotan_config_1.SOROTAN_CONFIG.HARGA_PAKET,
                        tipe: client_1.TransaksiIklanTipe.KEMBALI,
                    },
                }),
                this.prisma.user.update({
                    where: { id: iklan.pemilikId },
                    data: { currency: { increment: sorotan_config_1.SOROTAN_CONFIG.HARGA_PAKET } },
                }),
            ]);
            message = 'Iklan ditolak, currency dikembalikan.';
        }
        else if (keputusan === client_1.IklanKeputusan.REVISI) {
            const revisiCount = await this.prisma.moderasiIklan.count({
                where: { iklanId, keputusan: client_1.IklanKeputusan.REVISI },
            });
            if (revisiCount >= 2) {
                throw new common_1.BadRequestException('Iklan telah mencapai batas maksimal 2 kali revisi.');
            }
            if (!dto.catatanRevisi || dto.catatanRevisi.trim().length === 0) {
                throw new common_1.BadRequestException('Catatan revisi wajib diisi.');
            }
            updateData = {
                status: client_1.IklanStatus.DRAFT,
                jumlahRevisi: { increment: 1 },
                catatanRevisi: dto.catatanRevisi.trim(),
            };
            message = 'Iklan dikembalikan untuk revisi.';
        }
        else if (keputusan === client_1.IklanKeputusan.TARIK) {
            updateData = { status: client_1.IklanStatus.DITARIK };
            message = 'Iklan ditarik.';
        }
        await this.prisma.$transaction([
            this.prisma.iklan.update({ where: { id: iklanId }, data: updateData }),
            this.prisma.moderasiIklan.create({
                data: {
                    iklanId,
                    adminId,
                    keputusan,
                    alasan: dto.alasan?.trim() ?? dto.catatanRevisi?.trim() ?? null,
                },
            }),
        ]);
        return { message, iklanId, status: updateData.status };
    }
    async expireExpiredIklan() {
        const now = new Date();
        return this.prisma.iklan.updateMany({
            where: {
                status: client_1.IklanStatus.DISETUJUI,
                berakhirAt: { lt: now },
            },
            data: { status: client_1.IklanStatus.BERAKHIR },
        });
    }
};
exports.SorotanService = SorotanService;
exports.SorotanService = SorotanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SorotanService);
//# sourceMappingURL=sorotan.service.js.map