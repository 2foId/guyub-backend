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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const USER_SELECT = { id: true, nama: true, avatarUrl: true };
let MessagesService = class MessagesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async send(senderId, receiverId, isi) {
        if (senderId === receiverId)
            throw new common_1.BadRequestException('Tidak bisa mengirim pesan ke diri sendiri');
        const receiver = await this.prisma.user.findUnique({ where: { id: receiverId } });
        if (!receiver)
            throw new common_1.NotFoundException('Penerima tidak ditemukan');
        return this.prisma.message.create({
            data: { senderId, receiverId, isi },
            include: { sender: { select: USER_SELECT }, receiver: { select: USER_SELECT } },
        });
    }
    async inbox(userId) {
        const received = await this.prisma.message.findMany({
            where: { receiverId: userId },
            orderBy: { createdAt: 'desc' },
            include: { sender: { select: USER_SELECT } },
        });
        const latestBySender = new Map();
        for (const message of received) {
            if (!latestBySender.has(message.senderId))
                latestBySender.set(message.senderId, message);
        }
        return Array.from(latestBySender.values()).map((message) => ({
            sender: message.sender,
            lastMessage: message.isi,
            preview: message.isi.length > 10 ? `${message.isi.slice(0, 10)}…` : message.isi,
            updatedAt: message.createdAt,
        }));
    }
    async thread(userId, otherId) {
        const other = await this.prisma.user.findUnique({ where: { id: otherId } });
        if (!other)
            throw new common_1.NotFoundException('User tidak ditemukan');
        return this.prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId, receiverId: otherId },
                    { senderId: otherId, receiverId: userId },
                ],
            },
            orderBy: { createdAt: 'asc' },
            include: { sender: { select: USER_SELECT }, receiver: { select: USER_SELECT } },
        });
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map