import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { OnboardingAgeDto } from './dto/onboarding-age.dto';
import { OnboardingBidangDto } from './dto/onboarding-bidang.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMineLevel(userId: string): Promise<{
        currency: number;
        level: number;
        xpTotal: number;
        xpSaatIni: number;
        xpDibutuhkan: number;
        persen: number;
    }>;
    updateTheme(userId: string, dto: UpdateThemeDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        nama: string;
        bio: string | null;
        avatarUrl: string | null;
        id: string;
        kontak: string | null;
        dusun: string | null;
        role: import(".prisma/client").$Enums.Role;
        themePreference: import(".prisma/client").$Enums.ThemePreference;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findMe(userId: string): Promise<{
        nama: string;
        phone: string | null;
        bio: string | null;
        avatarUrl: string | null;
        keahlian: import(".prisma/client").$Enums.SkillCategory[];
        ketersediaan: string | null;
        kabupatenKota: string | null;
        id: string;
        dusun: string | null;
        role: import(".prisma/client").$Enums.Role;
        onboardingDone: boolean;
        themePreference: import(".prisma/client").$Enums.ThemePreference;
        bingkaiAktifId: string | null;
        createdAt: Date;
        bingkaiDimiliki: ({
            bingkai: {
                nama: string;
                id: string;
                createdAt: Date;
                kode: string;
                harga: number;
                gaya: string;
            };
        } & {
            id: string;
            userId: string;
            bingkaiId: string;
            dibeliAt: Date;
        })[];
    } | null>;
    findMine(userId: string): Promise<{
        nama: string;
        phone: string | null;
        bio: string | null;
        avatarUrl: string | null;
        keahlian: import(".prisma/client").$Enums.SkillCategory[];
        ketersediaan: string | null;
        kabupatenKota: string | null;
        id: string;
        dusun: string | null;
        role: import(".prisma/client").$Enums.Role;
        onboardingDone: boolean;
        themePreference: import(".prisma/client").$Enums.ThemePreference;
        bingkaiAktifId: string | null;
        createdAt: Date;
        bingkaiDimiliki: ({
            bingkai: {
                nama: string;
                id: string;
                createdAt: Date;
                kode: string;
                harga: number;
                gaya: string;
            };
        } & {
            id: string;
            userId: string;
            bingkaiId: string;
            dibeliAt: Date;
        })[];
    } | null>;
    updateMine(userId: string, dto: UpdateProfileDto): Promise<{
        nama: string;
        phone: string | null;
        bio: string | null;
        avatarUrl: string | null;
        keahlian: import(".prisma/client").$Enums.SkillCategory[];
        ketersediaan: string | null;
        kabupatenKota: string | null;
        id: string;
        dusun: string | null;
        role: import(".prisma/client").$Enums.Role;
        onboardingDone: boolean;
        themePreference: import(".prisma/client").$Enums.ThemePreference;
        createdAt: Date;
    }>;
    saveOnboardingAge(userId: string, dto: OnboardingAgeDto): Promise<{
        age: number;
        role: string;
    }>;
    saveOnboardingBidang(userId: string, dto: OnboardingBidangDto): Promise<{
        bidang: string;
    }>;
    completeOnboarding(userId: string): Promise<{
        nama: string;
        phone: string | null;
        bio: string | null;
        avatarUrl: string | null;
        keahlian: import(".prisma/client").$Enums.SkillCategory[];
        ketersediaan: string | null;
        kabupatenKota: string | null;
        id: string;
        dusun: string | null;
        role: import(".prisma/client").$Enums.Role;
        onboardingDone: boolean;
        themePreference: import(".prisma/client").$Enums.ThemePreference;
        bingkaiAktifId: string | null;
        createdAt: Date;
        bingkaiDimiliki: ({
            bingkai: {
                nama: string;
                id: string;
                createdAt: Date;
                kode: string;
                harga: number;
                gaya: string;
            };
        } & {
            id: string;
            userId: string;
            bingkaiId: string;
            dibeliAt: Date;
        })[];
    } | null>;
    uploadAvatar(userId: string, file: {
        filename: string;
    } | undefined): import(".prisma/client").Prisma.Prisma__UserClient<{
        nama: string;
        avatarUrl: string | null;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findNotes(targetUserId: string, authorId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        targetUserId: string;
        isi: string;
    }[]>;
    createNote(targetUserId: string, authorId: string, dto: CreateNoteDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        targetUserId: string;
        isi: string;
    }>;
    deleteNote(targetUserId: string, noteId: string, authorId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        targetUserId: string;
        isi: string;
    }>;
    findPublic(id: string): Promise<{
        phone: string | null;
        nama: string;
        bio: string | null;
        avatarUrl: string | null;
        keahlian: import(".prisma/client").$Enums.SkillCategory[];
        ketersediaan: string | null;
        id: string;
        dusun: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
    findRatings(userId: string): Promise<{
        avgScore: number;
        jumlahUlasan: number;
        ulasan: {
            id: string;
            score: number;
            comment: string | null;
            createdAt: Date;
            fromUser: {
                nama: string;
                avatarUrl: string | null;
                id: string;
            };
        }[];
    }>;
}
