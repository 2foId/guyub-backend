import { UmkmService } from './umkm.service';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto/create-portfolio.dto';
export declare class UmkmPortfolioController {
    private umkmService;
    constructor(umkmService: UmkmService);
    addPortfolio(responseId: string, userId: string, role: string, files: any, dto: CreatePortfolioDto): Promise<{
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
    getVolunteerPortfolio(volunteerId: string, limit?: string): Promise<({
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
}
