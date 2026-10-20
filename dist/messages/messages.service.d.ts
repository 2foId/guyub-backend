import { PrismaService } from '../prisma/prisma.service';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    send(senderId: string, receiverId: string, isi: string): Promise<{
        sender: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
        receiver: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        isi: string;
        senderId: string;
        receiverId: string;
    }>;
    inbox(userId: string): Promise<{
        sender: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
        lastMessage: string;
        preview: string;
        updatedAt: Date;
    }[]>;
    thread(userId: string, otherId: string): Promise<({
        sender: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
        receiver: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        isi: string;
        senderId: string;
        receiverId: string;
    })[]>;
}
