import { PrismaService } from '../prisma/prisma.service';
export interface BingkaiItem {
    id: string;
    kode: string;
    nama: string;
    harga: number;
    gaya: string;
    dimiliki: boolean;
    dipasang: boolean;
}
export interface BingkaiListResponse {
    items: BingkaiItem[];
    currency: number;
}
export declare class BingkaiService {
    private prisma;
    constructor(prisma: PrismaService);
    listForUser(userId: string): Promise<BingkaiListResponse>;
    beli(userId: string, bingkaiId: string): Promise<{
        message: string;
        bingkaiId: string;
    }>;
    pasang(userId: string, bingkaiId: string | null): Promise<{
        message: string;
        bingkaiAktifId: string | null;
    }>;
}
