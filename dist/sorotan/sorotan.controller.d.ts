import { SorotanService } from './sorotan.service';
export declare class IklanController {
    private sorotanService;
    constructor(sorotanService: SorotanService);
    createDraft(userId: string, dto: any): Promise<{
        kabupatenKota: string;
        id: string;
        bidang: string;
        status: import(".prisma/client").$Enums.IklanStatus;
        judul: string;
        deskripsi: string;
        alasanTolak: string | null;
        pemilikId: string;
        fotoUrl: string | null;
        catatanRevisi: string | null;
        jumlahRevisi: number;
        mulaiAt: Date | null;
        berakhirAt: Date | null;
        kuotaHarian: number;
        dibuatAt: Date;
        diperbaruiAt: Date;
    }>;
    updateDraft(userId: string, iklanId: string, dto: any): Promise<{
        kabupatenKota: string;
        id: string;
        bidang: string;
        status: import(".prisma/client").$Enums.IklanStatus;
        judul: string;
        deskripsi: string;
        alasanTolak: string | null;
        pemilikId: string;
        fotoUrl: string | null;
        catatanRevisi: string | null;
        jumlahRevisi: number;
        mulaiAt: Date | null;
        berakhirAt: Date | null;
        kuotaHarian: number;
        dibuatAt: Date;
        diperbaruiAt: Date;
    }>;
    ajukan(userId: string, iklanId: string): Promise<{
        kabupatenKota: string;
        id: string;
        bidang: string;
        status: import(".prisma/client").$Enums.IklanStatus;
        judul: string;
        deskripsi: string;
        alasanTolak: string | null;
        pemilikId: string;
        fotoUrl: string | null;
        catatanRevisi: string | null;
        jumlahRevisi: number;
        mulaiAt: Date | null;
        berakhirAt: Date | null;
        kuotaHarian: number;
        dibuatAt: Date;
        diperbaruiAt: Date;
    }>;
    getMyIklan(userId: string): Promise<({
        _count: {
            moderasi: number;
        };
    } & {
        kabupatenKota: string;
        id: string;
        bidang: string;
        status: import(".prisma/client").$Enums.IklanStatus;
        judul: string;
        deskripsi: string;
        alasanTolak: string | null;
        pemilikId: string;
        fotoUrl: string | null;
        catatanRevisi: string | null;
        jumlahRevisi: number;
        mulaiAt: Date | null;
        berakhirAt: Date | null;
        kuotaHarian: number;
        dibuatAt: Date;
        diperbaruiAt: Date;
    })[]>;
    getTayang(bidang?: string): Promise<{
        id: string;
        judul: string;
        deskripsi: string;
        bidang: string;
        kabupatenKota: string;
        fotoUrl: string | null;
        pemilik: {
            id: string | undefined;
            nama: string | undefined;
            kabupatenKota: string | null | undefined;
        };
        kuotaHarian: number;
        tayangHariIni: number;
    } | null>;
    catatTayang(iklanId: string): Promise<{
        id: string;
        tanggal: Date;
        iklanId: string;
        tayang: number;
        klik: number;
    }>;
    catatKlik(iklanId: string): Promise<{
        id: string;
        tanggal: Date;
        iklanId: string;
        tayang: number;
        klik: number;
    }>;
}
export declare class AdminIklanController {
    private sorotanService;
    constructor(sorotanService: SorotanService);
    getAdminIklan(status?: string): Promise<({
        pemilik: {
            nama: string;
            phone: string | null;
            kabupatenKota: string | null;
            id: string;
            dusun: string | null;
        };
        moderasi: {
            id: string;
            createdAt: Date;
            alasan: string | null;
            keputusan: import(".prisma/client").$Enums.IklanKeputusan;
            iklanId: string;
            adminId: string;
        }[];
    } & {
        kabupatenKota: string;
        id: string;
        bidang: string;
        status: import(".prisma/client").$Enums.IklanStatus;
        judul: string;
        deskripsi: string;
        alasanTolak: string | null;
        pemilikId: string;
        fotoUrl: string | null;
        catatanRevisi: string | null;
        jumlahRevisi: number;
        mulaiAt: Date | null;
        berakhirAt: Date | null;
        kuotaHarian: number;
        dibuatAt: Date;
        diperbaruiAt: Date;
    })[]>;
    getAdminIklanDetail(iklanId: string): Promise<{
        pemilik: {
            nama: string;
            phone: string | null;
            kabupatenKota: string | null;
            id: string;
            dusun: string | null;
            role: import(".prisma/client").$Enums.Role;
        };
        tayangan: {
            id: string;
            tanggal: Date;
            iklanId: string;
            tayang: number;
            klik: number;
        }[];
        transaksi: {
            id: string;
            createdAt: Date;
            pemilikId: string;
            jumlah: number;
            iklanId: string;
            tipe: import(".prisma/client").$Enums.TransaksiIklanTipe;
        }[];
        moderasi: ({
            admin: {
                nama: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            alasan: string | null;
            keputusan: import(".prisma/client").$Enums.IklanKeputusan;
            iklanId: string;
            adminId: string;
        })[];
    } & {
        kabupatenKota: string;
        id: string;
        bidang: string;
        status: import(".prisma/client").$Enums.IklanStatus;
        judul: string;
        deskripsi: string;
        alasanTolak: string | null;
        pemilikId: string;
        fotoUrl: string | null;
        catatanRevisi: string | null;
        jumlahRevisi: number;
        mulaiAt: Date | null;
        berakhirAt: Date | null;
        kuotaHarian: number;
        dibuatAt: Date;
        diperbaruiAt: Date;
    }>;
    keputusan(adminId: string, iklanId: string, dto: any): Promise<{
        message: string;
        iklanId: string;
        status: string;
    }>;
}
