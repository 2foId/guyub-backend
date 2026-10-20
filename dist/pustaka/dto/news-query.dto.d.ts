export declare class NewsQueryDto {
    q?: string;
    kabupaten?: string;
    urutan?: 'terbaru' | 'terlama' | 'relevan';
    halaman: number;
}
