import { BantuanKategori, PreferensiRelawan } from '@prisma/client';
export declare class CreateBantuanDto {
    judul: string;
    deskripsi: string;
    kategori: BantuanKategori;
    latitude: number;
    longitude: number;
    alamat: string;
    kabupatenKota: string;
    preferensiRelawan?: PreferensiRelawan;
    dibutuhkanSebelum: string;
    foto?: string[];
}
