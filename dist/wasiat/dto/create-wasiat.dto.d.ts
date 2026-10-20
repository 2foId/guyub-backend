import { WasiatKategori } from '@prisma/client';
declare class CreateWasiatSoalDto {
    pertanyaan: string;
    opsi: string[];
    jawabanBenar: number;
}
declare class CreateWasiatQuestDto {
    judul: string;
    tujuan: string;
    kuis: CreateWasiatSoalDto[];
}
export declare class CreateWasiatDto {
    judul: string;
    kategori: WasiatKategori;
    isi: string;
    poinKiat: string[];
    foto?: string[];
    quest?: CreateWasiatQuestDto[];
}
export {};
