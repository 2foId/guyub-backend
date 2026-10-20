import { PrismaService } from '../prisma/prisma.service';
import { CreateCitationDto } from './dto/create-citation.dto';
import { CreateLibraryNoteDto } from './dto/create-library-note.dto';
import { UpdateLibraryNoteDto } from './dto/update-library-note.dto';
export declare class LibraryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listNotes(userId: string, pageValue?: string): Promise<{
        items: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            judul: string;
            catatan: string | null;
            penulis: string | null;
            tahun: number | null;
            penerbit: string | null;
            tautan: string | null;
        }[];
        page: number;
        limit: number;
        hasMore: boolean;
    }>;
    createNote(userId: string, dto: CreateLibraryNoteDto): import(".prisma/client").Prisma.Prisma__LibraryNoteClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        judul: string;
        catatan: string | null;
        penulis: string | null;
        tahun: number | null;
        penerbit: string | null;
        tautan: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateNote(userId: string, id: string, dto: UpdateLibraryNoteDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        judul: string;
        catatan: string | null;
        penulis: string | null;
        tahun: number | null;
        penerbit: string | null;
        tautan: string | null;
    }>;
    deleteNote(userId: string, id: string): Promise<{
        message: string;
    }>;
    createCitation(userId: string, dto: CreateCitationDto): Promise<{
        apa: string;
        indonesia: string;
    }>;
    listLocalRegions(): import(".prisma/client").Prisma.PrismaPromise<({
        articles: {
            id: string;
            createdAt: Date;
            judul: string;
            ringkasan: string;
            tautan: string;
            terverifikasi: boolean;
            sumber: string;
            regionId: string;
        }[];
    } & {
        nama: string;
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.LocalRegionStatus;
        ringkasan: string | null;
        slug: string;
        pertanyaanPemantik: string | null;
    })[]>;
}
