import { PrismaService } from '../prisma/prisma.service';
import { ThemePreference } from '@prisma/client';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        nama: string;
        phone: string | null;
        bio: string | null;
        avatarUrl: string | null;
        keahlian: import(".prisma/client").$Enums.SkillCategory[];
        ketersediaan: string | null;
        kabupatenKota: string | null;
        level: number;
        id: string;
        email: string;
        passwordHash: string;
        emailVerifiedAt: Date | null;
        kontak: string | null;
        dusun: string | null;
        rt: string | null;
        rw: string | null;
        role: import(".prisma/client").$Enums.Role;
        onboardingDone: boolean;
        age: number | null;
        bidang: string | null;
        xpTotal: number;
        currency: number;
        themePreference: import(".prisma/client").$Enums.ThemePreference;
        bingkaiAktifId: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findById(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        nama: string;
        phone: string | null;
        bio: string | null;
        avatarUrl: string | null;
        keahlian: import(".prisma/client").$Enums.SkillCategory[];
        ketersediaan: string | null;
        kabupatenKota: string | null;
        level: number;
        id: string;
        email: string;
        passwordHash: string;
        emailVerifiedAt: Date | null;
        kontak: string | null;
        dusun: string | null;
        rt: string | null;
        rw: string | null;
        role: import(".prisma/client").$Enums.Role;
        onboardingDone: boolean;
        age: number | null;
        bidang: string | null;
        xpTotal: number;
        currency: number;
        themePreference: import(".prisma/client").$Enums.ThemePreference;
        bingkaiAktifId: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    getLevel(id: string): Promise<{
        currency: number;
        level: number;
        xpTotal: number;
        xpSaatIni: number;
        xpDibutuhkan: number;
        persen: number;
    }>;
    updateTheme(id: string, theme: ThemePreference): import(".prisma/client").Prisma.Prisma__UserClient<{
        nama: string;
        bio: string | null;
        avatarUrl: string | null;
        id: string;
        kontak: string | null;
        dusun: string | null;
        role: import(".prisma/client").$Enums.Role;
        themePreference: import(".prisma/client").$Enums.ThemePreference;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findPublicProfile(id: string): Promise<{
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
    findMyProfile(id: string): Promise<{
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
    updateProfile(id: string, dto: UpdateProfileDto): Promise<{
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
    saveOnboardingAge(id: string, age: number): Promise<{
        age: number;
        role: string;
    }>;
    saveOnboardingBidang(id: string, bidang: string): Promise<{
        bidang: string;
    }>;
    completeOnboarding(id: string): Promise<{
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
    updateAvatar(id: string, avatarUrl: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        nama: string;
        avatarUrl: string | null;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findNotes(authorId: string, targetUserId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        targetUserId: string;
        isi: string;
    }[]>;
    createNote(authorId: string, targetUserId: string, isi: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        targetUserId: string;
        isi: string;
    }>;
    findUserRatings(userId: string): Promise<{
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
    deleteNote(authorId: string, targetUserId: string, noteId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        targetUserId: string;
        isi: string;
    }>;
    create(data: {
        nama: string;
        email: string;
        passwordHash: string;
        dusun?: string;
        rt?: string;
        rw?: string;
    }): import(".prisma/client").Prisma.Prisma__UserClient<{
        nama: string;
        phone: string | null;
        bio: string | null;
        avatarUrl: string | null;
        keahlian: import(".prisma/client").$Enums.SkillCategory[];
        ketersediaan: string | null;
        kabupatenKota: string | null;
        level: number;
        id: string;
        email: string;
        passwordHash: string;
        emailVerifiedAt: Date | null;
        kontak: string | null;
        dusun: string | null;
        rt: string | null;
        rw: string | null;
        role: import(".prisma/client").$Enums.Role;
        onboardingDone: boolean;
        age: number | null;
        bidang: string | null;
        xpTotal: number;
        currency: number;
        themePreference: import(".prisma/client").$Enums.ThemePreference;
        bingkaiAktifId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    verifyEmail(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        nama: string;
        phone: string | null;
        bio: string | null;
        avatarUrl: string | null;
        keahlian: import(".prisma/client").$Enums.SkillCategory[];
        ketersediaan: string | null;
        kabupatenKota: string | null;
        level: number;
        id: string;
        email: string;
        passwordHash: string;
        emailVerifiedAt: Date | null;
        kontak: string | null;
        dusun: string | null;
        rt: string | null;
        rw: string | null;
        role: import(".prisma/client").$Enums.Role;
        onboardingDone: boolean;
        age: number | null;
        bidang: string | null;
        xpTotal: number;
        currency: number;
        themePreference: import(".prisma/client").$Enums.ThemePreference;
        bingkaiAktifId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        nama: string;
        id: string;
        email: string;
        emailVerifiedAt: Date | null;
        dusun: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
}
