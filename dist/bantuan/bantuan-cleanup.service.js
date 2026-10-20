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
var BantuanCleanupService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BantuanCleanupService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let BantuanCleanupService = BantuanCleanupService_1 = class BantuanCleanupService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(BantuanCleanupService_1.name);
    }
    async hapusPermintaanSelesaiLama() {
        const cutoff = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
        const expired = await this.prisma.bantuanRequest.findMany({
            where: { status: client_1.BantuanStatus.SELESAI, selesaiAt: { lt: cutoff } },
            select: { id: true, foto: true },
        });
        const result = expired.length
            ? await this.prisma.bantuanRequest.deleteMany({ where: { id: { in: expired.map((request) => request.id) } } })
            : { count: 0 };
        const uploadsDir = (0, path_1.join)(process.cwd(), 'uploads');
        for (const request of expired) {
            for (const photo of request.foto) {
                const filename = (0, path_1.basename)(photo);
                if (!filename || filename === '.' || filename === '..')
                    continue;
                try {
                    await (0, promises_1.unlink)((0, path_1.join)(uploadsDir, filename));
                }
                catch (error) {
                    this.logger.warn(`Gagal menghapus foto ${filename}: ${String(error)}`);
                }
            }
        }
        this.logger.log(`${result.count} permintaan bantuan selesai yang berumur lebih dari 3 hari dihapus.`);
    }
};
exports.BantuanCleanupService = BantuanCleanupService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BantuanCleanupService.prototype, "hapusPermintaanSelesaiLama", null);
exports.BantuanCleanupService = BantuanCleanupService = BantuanCleanupService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BantuanCleanupService);
//# sourceMappingURL=bantuan-cleanup.service.js.map