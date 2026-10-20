import { PrismaService } from '../prisma/prisma.service';
import { CreateAcaraDto } from './dto/create-acara.dto';
import { CreateLogistikDto } from './dto/create-logistik.dto';
export declare class AcaraService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateAcaraDto): Promise<{
        nama: string;
        kabupatenKota: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string;
        foto: string[];
        pembuatId: string;
        jenis: string;
        lokasi: string;
        waktuMulai: Date;
        waktuSelesai: Date | null;
        targetHadir: number;
        kodeQr: string | null;
        kodeQrExpiresAt: Date | null;
        kodeAbsen: string | null;
    }>;
    findAll(kabupaten?: string): import(".prisma/client").Prisma.PrismaPromise<({
        _count: {
            logistik: number;
            absensi: number;
        };
        pembuat: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
    } & {
        nama: string;
        kabupatenKota: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string;
        foto: string[];
        pembuatId: string;
        jenis: string;
        lokasi: string;
        waktuMulai: Date;
        waktuSelesai: Date | null;
        targetHadir: number;
        kodeQr: string | null;
        kodeQrExpiresAt: Date | null;
        kodeAbsen: string | null;
    })[]>;
    findOne(id: string): Promise<{
        pembuat: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
        logistik: {
            id: string;
            createdAt: Date;
            itemNama: string;
            jumlah: number;
            penanggungJawab: string | null;
            acaraId: string;
            dipenuhi: boolean;
        }[];
        absensi: ({
            user: {
                nama: string;
                avatarUrl: string | null;
                id: string;
            };
        } & {
            id: string;
            userId: string;
            hadir: boolean;
            waktuAbsen: Date;
            acaraId: string;
        })[];
    } & {
        nama: string;
        kabupatenKota: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string;
        foto: string[];
        pembuatId: string;
        jenis: string;
        lokasi: string;
        waktuMulai: Date;
        waktuSelesai: Date | null;
        targetHadir: number;
        kodeQr: string | null;
        kodeQrExpiresAt: Date | null;
        kodeAbsen: string | null;
    }>;
    addLogistik(acaraId: string, dto: CreateLogistikDto): Promise<{
        id: string;
        createdAt: Date;
        itemNama: string;
        jumlah: number;
        penanggungJawab: string | null;
        acaraId: string;
        dipenuhi: boolean;
    }>;
    toggleLogistikDipenuhi(logistikId: string): Promise<{
        id: string;
        createdAt: Date;
        itemNama: string;
        jumlah: number;
        penanggungJawab: string | null;
        acaraId: string;
        dipenuhi: boolean;
    }>;
    generateQr(acaraId: string, creatorId: string): Promise<{
        kodeQr: string | null;
        kodeQrExpiresAt: Date | null;
    }>;
    generateKodeAbsen(acaraId: string, creatorId: string): Promise<{
        kodeAbsen: string | null;
    }>;
    absen(acaraId: string, userId: string, kode: string): Promise<{
        id: string;
        userId: string;
        hadir: boolean;
        waktuAbsen: Date;
        acaraId: string;
    }>;
}
