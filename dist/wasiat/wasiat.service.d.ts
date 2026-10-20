import { PrismaService } from '../prisma/prisma.service';
import { CreateWasiatDto } from './dto/create-wasiat.dto';
import { CreateLangkahDto } from './dto/create-langkah.dto';
import { Prisma, WasiatKategori } from '@prisma/client';
export declare class WasiatService {
    private prisma;
    constructor(prisma: PrismaService);
    private sanitizeKuis;
    private validateKuis;
    private validateStoredKuis;
    create(userId: string, dto: CreateWasiatDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isi: string;
        judul: string;
        kategori: import(".prisma/client").$Enums.WasiatKategori;
        foto: string[];
        poinKiat: string[];
        isTemplate: boolean;
        penulisId: string;
    }>;
    findAll(kategori?: WasiatKategori): Promise<{
        rating: number | null;
        jumlahRater: number;
        _count: {
            saved: number;
            comments: number;
        };
        penulis: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
        langkah: {
            id: string;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isi: string;
        judul: string;
        kategori: import(".prisma/client").$Enums.WasiatKategori;
        foto: string[];
        poinKiat: string[];
        isTemplate: boolean;
        penulisId: string;
    }[]>;
    findOne(id: string): Promise<{
        penulis: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
        comments: ({
            user: {
                nama: string;
                avatarUrl: string | null;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            isi: string;
            wasiatId: string;
            rating: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isi: string;
        judul: string;
        kategori: import(".prisma/client").$Enums.WasiatKategori;
        foto: string[];
        poinKiat: string[];
        isTemplate: boolean;
        penulisId: string;
    }>;
    createLangkah(wasiatId: string, userId: string, dto: CreateLangkahDto): Promise<{
        kuis: {
            pertanyaan: string;
            opsi: string[];
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        judul: string;
        tujuan: string;
        urutan: number;
        wasiatId: string;
        jawabanDiacak: boolean;
    }>;
    findLangkah(wasiatId: string, userId: string): Promise<{
        id: string;
        wasiatId: string;
        urutan: number;
        judul: string;
        tujuan: string;
        kuis: {
            pertanyaan: string;
            opsi: string[];
        }[];
        status: string;
        progress: {
            id: string;
            skor: number;
            lulus: boolean;
            percobaan: number;
            selesaiAt: Date | null;
            feedbackCatatan: string | null;
            feedbackAt: Date | null;
        } | null;
    }[]>;
    submitLangkah(wasiatId: string, urutan: number, userId: string, jawaban: number[]): Promise<{
        wasiatId: string;
        progressId: string;
        skor: number;
        lulus: boolean;
        benar: number;
        total: number;
        xpDidapat: number;
        levelBaru: null;
        badgeBaru: {
            kategori: import(".prisma/client").$Enums.WasiatKategori;
            penjelajahKearifan: boolean;
        } | null;
        jawabanBenar: number[];
    }>;
    findMyProgress(userId: string): Promise<{
        totalXp: number;
        progress: ({
            wasiat: {
                id: string;
                judul: string;
                kategori: import(".prisma/client").$Enums.WasiatKategori;
                penulis: {
                    nama: string;
                    id: string;
                };
            };
            langkah: {
                id: string;
                judul: string;
                urutan: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            selesaiAt: Date | null;
            wasiatId: string;
            langkahId: string;
            skor: number;
            lulus: boolean;
            percobaan: number;
            feedbackCatatan: string | null;
            feedbackAt: Date | null;
        })[];
    }>;
    findWaitingFeedback(wasiatId: string, userId: string): Promise<({
        user: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
        langkah: {
            id: string;
            judul: string;
            urutan: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        selesaiAt: Date | null;
        wasiatId: string;
        langkahId: string;
        skor: number;
        lulus: boolean;
        percobaan: number;
        feedbackCatatan: string | null;
        feedbackAt: Date | null;
    })[]>;
    postFeedback(wasiatId: string, userId: string, progressId: string, catatan: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        selesaiAt: Date | null;
        wasiatId: string;
        langkahId: string;
        skor: number;
        lulus: boolean;
        percobaan: number;
        feedbackCatatan: string | null;
        feedbackAt: Date | null;
    }>;
    toggleSave(wasiatId: string, userId: string): Promise<{
        saved: boolean;
    }>;
    findMySaved(userId: string): Prisma.PrismaPromise<({
        wasiat: {
            penulis: {
                nama: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isi: string;
            judul: string;
            kategori: import(".prisma/client").$Enums.WasiatKategori;
            foto: string[];
            poinKiat: string[];
            isTemplate: boolean;
            penulisId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        wasiatId: string;
    })[]>;
    addComment(wasiatId: string, userId: string, isi: string, rating: number): Promise<{
        user: {
            nama: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        isi: string;
        wasiatId: string;
        rating: number;
    }>;
    deleteComment(wasiatId: string, commentId: string, userId: string, role: string): Promise<{
        message: string;
    }>;
}
