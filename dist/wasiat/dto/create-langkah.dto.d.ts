export declare class CreateKuisSoalDto {
    pertanyaan: string;
    opsi: string[];
    jawabanBenar: number;
}
export declare class CreateLangkahDto {
    urutan: number;
    judul: string;
    tujuan: string;
    kuis: CreateKuisSoalDto[];
}
