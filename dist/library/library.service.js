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
exports.LibraryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const LIBRARY_NOTE_PAGE_SIZE = 20;
let LibraryService = class LibraryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listNotes(userId, pageValue) {
        const page = pageValue === undefined ? 1 : Number(pageValue);
        if (!Number.isSafeInteger(page) || page < 1) {
            throw new common_1.BadRequestException('Nomor halaman harus bilangan bulat positif.');
        }
        const notes = await this.prisma.libraryNote.findMany({
            where: { userId },
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            skip: (page - 1) * LIBRARY_NOTE_PAGE_SIZE,
            take: LIBRARY_NOTE_PAGE_SIZE + 1,
        });
        const hasMore = notes.length > LIBRARY_NOTE_PAGE_SIZE;
        return {
            items: notes.slice(0, LIBRARY_NOTE_PAGE_SIZE),
            page,
            limit: LIBRARY_NOTE_PAGE_SIZE,
            hasMore,
        };
    }
    createNote(userId, dto) {
        return this.prisma.libraryNote.create({ data: { ...dto, userId } });
    }
    async updateNote(userId, id, dto) {
        const note = await this.prisma.libraryNote.findFirst({ where: { id, userId }, select: { id: true } });
        if (!note)
            throw new common_1.NotFoundException('Catatan rujukan tidak ditemukan.');
        return this.prisma.libraryNote.update({ where: { id: note.id }, data: dto });
    }
    async deleteNote(userId, id) {
        const note = await this.prisma.libraryNote.findFirst({ where: { id, userId }, select: { id: true } });
        if (!note)
            throw new common_1.NotFoundException('Catatan rujukan tidak ditemukan.');
        await this.prisma.libraryNote.delete({ where: { id: note.id } });
        return { message: 'Catatan rujukan dihapus.' };
    }
    async createCitation(userId, dto) {
        const author = dto.penulis?.trim() || '';
        const year = dto.tahun ? String(dto.tahun) : '';
        const title = dto.judul.trim();
        const publisher = dto.penerbit?.trim() || '';
        const apa = `${author || 'n.d.'} (${year || 'n.d.'}). ${title}.${publisher ? ` ${publisher}.` : ''}`;
        const indonesia = `${author || 'Tanpa penulis'}. ${year || 'tanpa tahun'}. ${title}.${publisher ? ` ${publisher}.` : ''}`;
        return { apa, indonesia };
    }
    listLocalRegions() {
        return this.prisma.localRegion.findMany({
            orderBy: { nama: 'asc' },
            include: {
                articles: {
                    where: { terverifikasi: true },
                    orderBy: [{ createdAt: 'desc' }, { judul: 'asc' }],
                },
            },
        });
    }
};
exports.LibraryService = LibraryService;
exports.LibraryService = LibraryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LibraryService);
//# sourceMappingURL=library.service.js.map