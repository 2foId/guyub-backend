import { SkillCategory } from '@prisma/client';
export declare class CreatePortfolioDto {
    title: string;
    description: string;
    category: SkillCategory;
}
export declare class UpdatePortfolioDto {
    title?: string;
    description?: string;
    category?: SkillCategory;
    isPublished?: boolean;
}
