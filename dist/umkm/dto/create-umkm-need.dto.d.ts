import { SkillCategory } from '@prisma/client';
export declare class CreateUmkmNeedDto {
    namaUsaha: string;
    kebutuhan: string;
    deskripsi: string;
    kategori: SkillCategory;
    dibutuhkanSebelum?: string;
    foto?: string[];
    kabupatenKota?: string;
}
