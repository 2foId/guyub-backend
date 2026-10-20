import { DampakService } from './dampak.service';
export declare class DampakController {
    private dampakService;
    constructor(dampakService: DampakService);
    getRingkasan(): Promise<{
        bantuanSelesai: number;
        jamTerkonfirmasi: number;
        jamMenungguKonfirmasi: number;
        portofolioTerbit: number;
        wasiatDibaca: number;
        kuisDiselesaikan: number;
        ratingRataRata: number;
        penggunaAktifPerMinggu: number;
        trenMingguan: {
            mingguMulai: string;
            bantuanSelesai: number;
            jamTerkonfirmasi: number;
            portofolioTerbit: number;
            kuisDiselesaikan: number;
            penggunaAktif: number;
        }[];
    }>;
    getKabupaten(): Promise<{
        bantuanSelesai: number;
        jamTerkonfirmasi: number;
        umkmTerbantu: number;
        kabupaten: string;
    }[]>;
}
