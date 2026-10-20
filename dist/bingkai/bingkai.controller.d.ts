import { BingkaiService } from './bingkai.service';
export declare class BingkaiController {
    private bingkaiService;
    constructor(bingkaiService: BingkaiService);
    list(userId: string): Promise<import("./bingkai.service").BingkaiListResponse>;
    beli(userId: string, bingkaiId: string): Promise<{
        message: string;
        bingkaiId: string;
    }>;
}
export declare class UsersBingkaiController {
    private bingkaiService;
    constructor(bingkaiService: BingkaiService);
    pasang(userId: string, dto: {
        bingkaiId: string | null;
    }): Promise<{
        message: string;
        bingkaiAktifId: string | null;
    }>;
}
