import { WasiatService } from './wasiat.service';
import { CreateWasiatDto } from './dto/create-wasiat.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { SubmitLangkahDto } from './dto/submit-langkah.dto';
import { FeedbackProgressDto } from './dto/feedback-progress.dto';
import { CreateLangkahDto } from './dto/create-langkah.dto';
import { WasiatKategori } from '@prisma/client';
export declare class WasiatController {
    private wasiatService;
    constructor(wasiatService: WasiatService);
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
    findMySaved(userId: string): import(".prisma/client").Prisma.PrismaPromise<({
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
    findLangkah(id: string, userId: string): Promise<{
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
    createLangkah(id: string, userId: string, dto: CreateLangkahDto): Promise<{
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
    submitLangkah(id: string, urutan: string, userId: string, dto: SubmitLangkahDto): Promise<{
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
    findWaitingFeedback(id: string, userId: string): Promise<({
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
    postFeedback(id: string, userId: string, dto: FeedbackProgressDto): Promise<{
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
    toggleSave(id: string, userId: string): Promise<{
        saved: boolean;
    }>;
    addComment(id: string, userId: string, dto: CreateCommentDto): Promise<{
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
    deleteComment(id: string, commentId: string, userId: string, role: string): Promise<{
        message: string;
    }>;
}
