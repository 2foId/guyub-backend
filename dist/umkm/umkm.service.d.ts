import { PrismaService } from '../prisma/prisma.service';
import { CreateUmkmNeedDto } from './dto/create-umkm-need.dto';
import { UmkmNeedStatus, SkillCategory } from '@prisma/client';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto/create-portfolio.dto';
import { CreateUmkmRatingDto } from './dto/create-rating.dto';
export declare class UmkmService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateUmkmNeedDto): Promise<{
        kabupatenKota: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.UmkmNeedStatus;
        deskripsi: string;
        dibutuhkanSebelum: Date | null;
        foto: string[];
        namaUsaha: string;
        kebutuhan: string;
        category: import(".prisma/client").$Enums.SkillCategory;
        pemilikId: string;
    }>;
    findAll(status?: UmkmNeedStatus, category?: SkillCategory, kabupaten?: string): import(".prisma/client").Prisma.PrismaPromise<({
        _count: {
            responses: number;
        };
        pemilik: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
    } & {
        kabupatenKota: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.UmkmNeedStatus;
        deskripsi: string;
        dibutuhkanSebelum: Date | null;
        foto: string[];
        namaUsaha: string;
        kebutuhan: string;
        category: import(".prisma/client").$Enums.SkillCategory;
        pemilikId: string;
    })[]>;
    findOne(id: string): Promise<{
        pemilik: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
        responses: ({
            penolong: {
                nama: string;
                avatarUrl: string | null;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            pesan: string;
            needId: string;
            penolongId: string;
        })[];
    } & {
        kabupatenKota: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.UmkmNeedStatus;
        deskripsi: string;
        dibutuhkanSebelum: Date | null;
        foto: string[];
        namaUsaha: string;
        kebutuhan: string;
        category: import(".prisma/client").$Enums.SkillCategory;
        pemilikId: string;
    }>;
    addResponse(needId: string, penolongId: string, pesan: string): Promise<{
        penolong: {
            nama: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        pesan: string;
        needId: string;
        penolongId: string;
    }>;
    updateStatus(id: string, userId: string, status: UmkmNeedStatus): Promise<{
        kabupatenKota: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.UmkmNeedStatus;
        deskripsi: string;
        dibutuhkanSebelum: Date | null;
        foto: string[];
        namaUsaha: string;
        kebutuhan: string;
        category: import(".prisma/client").$Enums.SkillCategory;
        pemilikId: string;
    }>;
    hapus(id: string, userId: string, role: string): Promise<{
        kabupatenKota: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.UmkmNeedStatus;
        deskripsi: string;
        dibutuhkanSebelum: Date | null;
        foto: string[];
        namaUsaha: string;
        kebutuhan: string;
        category: import(".prisma/client").$Enums.SkillCategory;
        pemilikId: string;
    }>;
    addPortfolio(responseId: string, userId: string, role: string, dto: CreatePortfolioDto & {
        beforeImageUrl: string;
        afterImageUrl: string;
    }): Promise<{
        umkmNeed: {
            id: string;
            namaUsaha: string;
            category: import(".prisma/client").$Enums.SkillCategory;
        };
    } & {
        id: string;
        createdAt: Date;
        responseId: string;
        title: string;
        description: string;
        category: import(".prisma/client").$Enums.SkillCategory;
        isPublished: boolean;
        volunteerId: string;
        umkmNeedId: string;
        beforeImageUrl: string;
        afterImageUrl: string;
    }>;
    updatePortfolio(id: string, userId: string, dto: UpdatePortfolioDto): Promise<{
        umkmNeed: {
            id: string;
            namaUsaha: string;
            category: import(".prisma/client").$Enums.SkillCategory;
        };
    } & {
        id: string;
        createdAt: Date;
        responseId: string;
        title: string;
        description: string;
        category: import(".prisma/client").$Enums.SkillCategory;
        isPublished: boolean;
        volunteerId: string;
        umkmNeedId: string;
        beforeImageUrl: string;
        afterImageUrl: string;
    }>;
    deletePortfolio(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        responseId: string;
        title: string;
        description: string;
        category: import(".prisma/client").$Enums.SkillCategory;
        isPublished: boolean;
        volunteerId: string;
        umkmNeedId: string;
        beforeImageUrl: string;
        afterImageUrl: string;
    }>;
    getVolunteerPortfolio(volunteerId: string, take: number): Promise<({
        umkmNeed: {
            id: string;
            namaUsaha: string;
            category: import(".prisma/client").$Enums.SkillCategory;
        };
        response: {
            id: string;
            pesan: string;
        };
    } & {
        id: string;
        createdAt: Date;
        responseId: string;
        title: string;
        description: string;
        category: import(".prisma/client").$Enums.SkillCategory;
        isPublished: boolean;
        volunteerId: string;
        umkmNeedId: string;
        beforeImageUrl: string;
        afterImageUrl: string;
    })[]>;
    addRating(responseId: string, userId: string, dto: CreateUmkmRatingDto): Promise<{
        fromUser: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        responseId: string;
        fromUserId: string;
        toUserId: string;
        score: number;
        comment: string | null;
    }>;
}
