"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BeritaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeritaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const allowed_domains_1 = require("./allowed-domains");
const blocked_terms_1 = require("./blocked-terms");
const mock_berita_1 = require("./mock-berita");
const regions_1 = require("./regions");
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const SEARCH_LIMIT_PER_DAY = 30;
const NEWS_PAGE_SIZE = 10;
let BeritaService = BeritaService_1 = class BeritaService {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(BeritaService_1.name);
        this.cache = new Map();
        this.dailyCounts = new Map();
    }
    async search(userId, query) {
        const q = (query.q ?? '').trim();
        const requestedKabupaten = (query.kabupaten ?? '').trim();
        if (q.length > 80 || /[\u0000-\u001f\u007f]/.test(q) || /[\u0000-\u001f\u007f]/.test(requestedKabupaten)) {
            throw new common_1.BadRequestException('Kata kunci tidak valid.');
        }
        const kabupaten = requestedKabupaten
            ? regions_1.LOCAL_REGION_NAMES.find((name) => name.toLocaleLowerCase('id-ID') === requestedKabupaten.toLocaleLowerCase('id-ID'))
            : undefined;
        if (requestedKabupaten && !kabupaten) {
            throw new common_1.BadRequestException('Kabupaten/kota tidak valid.');
        }
        const searchText = [q, kabupaten, 'Jawa Tengah'].filter(Boolean).join(' ');
        const normalizedQuery = searchText.toLocaleLowerCase('id-ID');
        if (blocked_terms_1.BLOCKED_TERMS.some((term) => normalizedQuery.includes(term))) {
            throw new common_1.BadRequestException('Kata kunci tidak dapat digunakan.');
        }
        const urutan = query.urutan ?? 'terbaru';
        const halaman = query.halaman ?? 1;
        this.incrementDailyCount(userId);
        const enabled = this.config.get('SERPAPI_ENABLED') === 'true';
        const apiKey = this.config.get('SERPAPI_KEY')?.trim();
        if (!enabled) {
            if (this.config.get('NODE_ENV') === 'production') {
                return this.emptyResult('Berita belum tersedia.', halaman, false);
            }
            const start = (halaman - 1) * NEWS_PAGE_SIZE;
            const wilayah = kabupaten || 'Jawa Tengah';
            const mockItems = this.sortItems(mock_berita_1.MOCK_NEWS.map((item, index) => ({
                ...item,
                title: `Data contoh ${index + 1}: ${wilayah}`,
                snippet: `Berita fiktif untuk menguji pencarian ${q ? `"${q}" di ` : ''}${wilayah}. Bukan informasi faktual.`,
                link: `https://example.com/berita-${index + 1}?wilayah=${encodeURIComponent(wilayah)}`,
            })), urutan).slice(start, start + NEWS_PAGE_SIZE);
            return {
                items: mockItems,
                message: mockItems.length ? undefined : 'Tidak ada berita yang cocok.',
                isMock: true,
                halaman,
                hasMore: start + NEWS_PAGE_SIZE < mock_berita_1.MOCK_NEWS.length,
            };
        }
        if (!apiKey)
            return this.emptyResult('Berita belum tersedia.', halaman, false);
        const cacheKey = `${searchText.toLocaleLowerCase('id-ID')}|${urutan}|${halaman}`;
        const cached = this.cache.get(cacheKey);
        if (cached && cached.expiresAt > Date.now()) {
            return { items: cached.items, message: cached.items.length ? undefined : 'Tidak ada berita yang cocok.', isMock: false, halaman, hasMore: cached.hasMore };
        }
        if (cached)
            this.cache.delete(cacheKey);
        try {
            const { items, hasMore } = await this.fetchNews(apiKey, searchText, urutan, halaman);
            this.cache.set(cacheKey, { expiresAt: Date.now() + CACHE_TTL_MS, items, hasMore });
            return {
                items,
                message: items.length ? undefined : 'Tidak ada berita yang cocok.',
                isMock: false,
                halaman,
                hasMore,
            };
        }
        catch (error) {
            if (error instanceof common_1.ServiceUnavailableException)
                throw error;
            throw new common_1.ServiceUnavailableException('Berita sedang tidak tersedia. Coba lagi nanti.');
        }
    }
    incrementDailyCount(userId) {
        const day = new Date().toISOString().slice(0, 10);
        const current = this.dailyCounts.get(userId);
        const count = current?.day === day ? current.count : 0;
        if (count >= SEARCH_LIMIT_PER_DAY) {
            throw new common_1.HttpException('Batas pencarian hari ini sudah tercapai.', common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        this.dailyCounts.set(userId, { day, count: count + 1 });
    }
    async fetchNews(apiKey, keyword, urutan, halaman) {
        const url = new URL('https://serpapi.com/search.json');
        url.searchParams.set('engine', 'google_news');
        url.searchParams.set('hl', 'id');
        url.searchParams.set('gl', 'id');
        url.searchParams.set('q', keyword);
        url.searchParams.set('start', String((halaman - 1) * NEWS_PAGE_SIZE));
        url.searchParams.set('api_key', apiKey);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        try {
            const response = await fetch(url, { signal: controller.signal });
            if (response.status === 401 || response.status === 403) {
                this.logger.error(`SerpAPI authentication failed (HTTP ${response.status}).`);
                throw new common_1.ServiceUnavailableException('Berita sedang tidak tersedia.');
            }
            if (response.status === 429) {
                throw new common_1.ServiceUnavailableException('Berita sedang tidak tersedia. Coba lagi nanti.');
            }
            if (!response.ok) {
                throw new common_1.ServiceUnavailableException('Berita sedang tidak tersedia. Coba lagi nanti.');
            }
            let payload;
            try {
                payload = await response.json();
            }
            catch {
                return { items: [], hasMore: false };
            }
            if (!payload || !Array.isArray(payload.news_results))
                return { items: [], hasMore: false };
            const items = payload.news_results
                .map((result) => this.toAllowedNewsItem(result))
                .filter((item) => item !== null);
            return {
                items: this.sortItems(items, urutan),
                hasMore: payload.news_results.length >= NEWS_PAGE_SIZE,
            };
        }
        catch (error) {
            if (error instanceof common_1.ServiceUnavailableException)
                throw error;
            throw new common_1.ServiceUnavailableException('Berita sedang tidak tersedia. Coba lagi nanti.');
        }
        finally {
            clearTimeout(timeout);
        }
    }
    toAllowedNewsItem(result) {
        if (!result || typeof result.title !== 'string' || typeof result.link !== 'string')
            return null;
        try {
            const url = new URL(result.link);
            if (!['http:', 'https:'].includes(url.protocol))
                return null;
            const host = url.hostname.toLowerCase();
            const allowed = allowed_domains_1.ALLOWED_NEWS_DOMAINS.some((domain) => host === domain || host.endsWith(`.${domain}`));
            if (!allowed)
                return null;
            return {
                title: result.title.slice(0, 300),
                snippet: typeof result.snippet === 'string' ? result.snippet.slice(0, 800) : '',
                source: typeof result.source?.name === 'string' ? result.source.name.slice(0, 120) : host,
                date: typeof result.iso_date === 'string' ? result.iso_date : typeof result.date === 'string' ? result.date : '',
                link: url.toString(),
            };
        }
        catch {
            return null;
        }
    }
    sortItems(items, order) {
        if (order === 'relevan')
            return items;
        return items.sort((left, right) => {
            const leftDate = Date.parse(left.date) || 0;
            const rightDate = Date.parse(right.date) || 0;
            return order === 'terlama' ? leftDate - rightDate : rightDate - leftDate;
        });
    }
    async searchLiterasi(userId, query) {
        const q = (query.q ?? '').trim();
        const sumber = query.sumber ?? 'semua';
        const urutan = query.urutan ?? 'relevan';
        const halaman = query.halaman ?? 1;
        if (q.length > 80 || /[\u0000-\u001f\u007f]/.test(q)) {
            throw new common_1.BadRequestException('Kata kunci tidak valid.');
        }
        const normalizedQuery = q.toLocaleLowerCase('id-ID');
        if (blocked_terms_1.BLOCKED_TERMS.some((term) => normalizedQuery.includes(term))) {
            throw new common_1.BadRequestException('Kata kunci tidak dapat digunakan.');
        }
        if (!['scholar', 'berita', 'semua'].includes(sumber)) {
            throw new common_1.BadRequestException('Sumber tidak valid.');
        }
        if (!['relevan', 'terbaru'].includes(urutan)) {
            throw new common_1.BadRequestException('Urutan tidak valid.');
        }
        this.incrementDailyCount(userId);
        const enabled = this.config.get('SERPAPI_ENABLED') === 'true';
        const apiKey = this.config.get('SERPAPI_KEY')?.trim();
        if (!enabled) {
            return this.emptyLiterasiResult('Pencarian belum tersedia.', halaman, false);
        }
        if (!apiKey)
            return this.emptyLiterasiResult('Pencarian belum tersedia.', halaman, false);
        const searchText = `${q} Jawa Tengah`;
        const cacheKey = `literasi|${searchText.toLocaleLowerCase('id-ID')}|${sumber}|${urutan}|${halaman}`;
        const cached = this.cache.get(cacheKey);
        if (cached && cached.expiresAt > Date.now()) {
            return {
                items: cached.items,
                message: cached.items.length ? undefined : 'Tidak ada hasil yang cocok.',
                halaman,
                hasMore: cached.hasMore,
            };
        }
        if (cached)
            this.cache.delete(cacheKey);
        try {
            const engineResults = [];
            if (sumber === 'scholar' || sumber === 'semua') {
                const scholar = await this.fetchLiterasi(apiKey, searchText, 'google_scholar', halaman);
                engineResults.push({ engine: 'google_scholar', items: scholar.items, hasMore: scholar.hasMore });
            }
            if (sumber === 'berita' || sumber === 'semua') {
                const berita = await this.fetchLiterasi(apiKey, searchText, 'google_news', halaman);
                engineResults.push({ engine: 'google_news', items: berita.items, hasMore: berita.hasMore });
            }
            let allItems = [];
            for (const r of engineResults) {
                for (const item of r.items) {
                    allItems.push({ ...item, engine: r.engine });
                }
            }
            allItems = this.sortLiterasiItems(allItems, urutan);
            const start = (halaman - 1) * NEWS_PAGE_SIZE;
            const paginated = allItems.slice(start, start + NEWS_PAGE_SIZE);
            const hasMore = start + NEWS_PAGE_SIZE < allItems.length;
            this.cache.set(cacheKey, { expiresAt: Date.now() + CACHE_TTL_MS, items: paginated, hasMore });
            return {
                items: paginated,
                message: paginated.length ? undefined : 'Tidak ada hasil yang cocok.',
                halaman,
                hasMore,
            };
        }
        catch (error) {
            if (error instanceof common_1.ServiceUnavailableException)
                throw error;
            throw new common_1.ServiceUnavailableException('Pencarian sedang tidak tersedia. Coba lagi nanti.');
        }
    }
    async fetchLiterasi(apiKey, keyword, engine, halaman) {
        const url = new URL('https://serpapi.com/search.json');
        url.searchParams.set('engine', engine);
        if (engine === 'google_news') {
            url.searchParams.set('hl', 'id');
            url.searchParams.set('gl', 'id');
        }
        url.searchParams.set('q', keyword);
        url.searchParams.set('start', String((halaman - 1) * NEWS_PAGE_SIZE));
        url.searchParams.set('api_key', apiKey);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        try {
            const response = await fetch(url, { signal: controller.signal });
            if (response.status === 401 || response.status === 403) {
                this.logger.error(`SerpAPI authentication failed (HTTP ${response.status}).`);
                throw new common_1.ServiceUnavailableException('Pencarian sedang tidak tersedia.');
            }
            if (response.status === 429) {
                throw new common_1.ServiceUnavailableException('Pencarian sedang tidak tersedia. Coba lagi nanti.');
            }
            if (!response.ok) {
                throw new common_1.ServiceUnavailableException('Pencarian sedang tidak tersedia. Coba lagi nanti.');
            }
            let payload;
            try {
                payload = await response.json();
            }
            catch {
                return { items: [], hasMore: false };
            }
            if (!payload || !Array.isArray(payload.news_results))
                return { items: [], hasMore: false };
            const items = payload.news_results
                .map((result) => this.toAllowedLiterasiItem(result))
                .filter((item) => item !== null);
            return {
                items,
                hasMore: payload.news_results.length >= NEWS_PAGE_SIZE,
            };
        }
        catch (error) {
            if (error instanceof common_1.ServiceUnavailableException)
                throw error;
            throw new common_1.ServiceUnavailableException('Pencarian sedang tidak tersedia. Coba lagi nanti.');
        }
        finally {
            clearTimeout(timeout);
        }
    }
    toAllowedLiterasiItem(result) {
        if (!result || typeof result.title !== 'string' || typeof result.link !== 'string')
            return null;
        try {
            const url = new URL(result.link);
            if (!['http:', 'https:'].includes(url.protocol))
                return null;
            const host = url.hostname.toLowerCase();
            const allowed = allowed_domains_1.ALLOWED_NEWS_DOMAINS.some((domain) => host === domain || host.endsWith(`.${domain}`));
            if (!allowed)
                return null;
            return {
                title: result.title.slice(0, 300),
                snippet: typeof result.snippet === 'string' ? result.snippet.slice(0, 800) : '',
                source: typeof result.source?.name === 'string' ? result.source.name.slice(0, 120) : host,
                date: typeof result.iso_date === 'string' ? result.iso_date : typeof result.date === 'string' ? result.date : '',
                link: url.toString(),
            };
        }
        catch {
            return null;
        }
    }
    sortLiterasiItems(items, order) {
        if (order === 'relevan')
            return items;
        return items.sort((left, right) => {
            const leftDate = Date.parse(left.date) || 0;
            const rightDate = Date.parse(right.date) || 0;
            return order === 'terlama' ? leftDate - rightDate : rightDate - leftDate;
        });
    }
    emptyLiterasiResult(message, halaman, isMock) {
        return { items: [], message, halaman, hasMore: false };
    }
    emptyResult(message, halaman, isMock) {
        return { items: [], message, isMock, halaman, hasMore: false };
    }
};
exports.BeritaService = BeritaService;
exports.BeritaService = BeritaService = BeritaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], BeritaService);
//# sourceMappingURL=berita.service.js.map