import { ConfigService } from '@nestjs/config';
import { NewsQueryDto } from './dto/news-query.dto';
import { LiterasiQueryDto } from './dto/literasi-query.dto';
import { NewsItem } from './mock-berita';
export declare class BeritaService {
    private readonly config;
    private readonly logger;
    private readonly cache;
    private readonly dailyCounts;
    constructor(config: ConfigService);
    search(userId: string, query: NewsQueryDto): Promise<{
        items: NewsItem[];
        message: string | undefined;
        isMock: boolean;
        halaman: number;
        hasMore: boolean;
    }>;
    private incrementDailyCount;
    private fetchNews;
    private toAllowedNewsItem;
    private sortItems;
    searchLiterasi(userId: string, query: LiterasiQueryDto): Promise<{
        items: NewsItem[];
        message: string | undefined;
        halaman: number;
        hasMore: boolean;
    }>;
    private fetchLiterasi;
    private toAllowedLiterasiItem;
    private sortLiterasiItems;
    private emptyLiterasiResult;
    private emptyResult;
}
