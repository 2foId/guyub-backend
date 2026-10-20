import { PrismaService } from '../prisma/prisma.service';
export declare class BantuanCleanupService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    hapusPermintaanSelesaiLama(): Promise<void>;
}
