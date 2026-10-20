export declare class CreateUmkmRatingDto {
    score: number;
    comment?: string;
}
export declare class UmkmRatingDto {
    id: string;
    score: number;
    comment?: string;
    createdAt: Date;
    fromUser: {
        id: string;
        nama: string;
        avatarUrl?: string | null;
    };
}
