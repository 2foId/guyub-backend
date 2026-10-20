export interface NewsItem {
    title: string;
    snippet: string;
    source: string;
    date: string;
    link: string;
    engine?: string;
}
export declare const MOCK_NEWS: NewsItem[];
