import { SkillCategory } from '@prisma/client';
export declare class UpdateProfileDto {
    nama?: string;
    phone?: string | null;
    bio?: string;
    avatarUrl?: string;
    keahlian?: SkillCategory[];
    ketersediaan?: string;
    kabupatenKota?: string;
}
