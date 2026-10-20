import { UmkmService } from './umkm.service';
import { CreateUmkmNeedDto } from './dto/create-umkm-need.dto';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateUmkmStatusDto } from './dto/update-status.dto';
import { CreateUmkmRatingDto } from './dto/create-rating.dto';
import { UmkmNeedStatus, SkillCategory } from '@prisma/client';
export declare class UmkmController {
    private umkmService;
    constructor(umkmService: UmkmService);
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
    addResponse(id: string, userId: string, dto: CreateResponseDto): Promise<{
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
    updateStatus(id: string, userId: string, dto: UpdateUmkmStatusDto): Promise<{
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
