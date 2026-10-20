import { AcaraService } from './acara.service';
import { CreateAcaraDto } from './dto/create-acara.dto';
import { CreateLogistikDto } from './dto/create-logistik.dto';
import { AbsenDto } from './dto/absen.dto';
export declare class AcaraController {
    private acaraService;
    constructor(acaraService: AcaraService);
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
    addLogistik(id: string, dto: CreateLogistikDto): Promise<{
        id: string;
        createdAt: Date;
        itemNama: string;
        jumlah: number;
        penanggungJawab: string | null;
        acaraId: string;
        dipenuhi: boolean;
    }>;
    toggleLogistik(logistikId: string): Promise<{
        id: string;
        createdAt: Date;
        itemNama: string;
        jumlah: number;
        penanggungJawab: string | null;
        acaraId: string;
        dipenuhi: boolean;
    }>;
    absen(id: string, userId: string, dto: AbsenDto): Promise<{
        id: string;
        userId: string;
        hadir: boolean;
        waktuAbsen: Date;
        acaraId: string;
    }>;
    generateKodeAbsen(id: string, creatorId: string): Promise<{
        kodeAbsen: string | null;
    }>;
    generateQr(id: string, creatorId: string): Promise<{
        kodeQr: string | null;
        kodeQrExpiresAt: Date | null;
    }>;
}
