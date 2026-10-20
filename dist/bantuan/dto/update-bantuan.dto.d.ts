import { BantuanKategori, PreferensiRelawan } from '@prisma/client';
export declare class UpdateBantuanDto {
    judul?: string;
    deskripsi?: string;
    kategori?: BantuanKategori;
    latitude?: number;
    longitude?: number;
    alamat?: string;
    preferensiRelawan?: PreferensiRelawan;
    dibutuhkanSebelum?: string;
    foto?: string[];
}
