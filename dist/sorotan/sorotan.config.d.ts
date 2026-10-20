export declare const SOROTAN_CONFIG: {
    readonly HARGA_PAKET: 1000;
    readonly DURASI_HARI: 3;
    readonly KUOTA_TAYANGAN_PER_HARI: 100;
    readonly BATAS_IKLAN_AKTIF: 1;
    readonly FREKUENSI_PER_USER_PER_IKLAN_PER_HARI: 2;
    readonly JUDUL_MAX: 40;
    readonly DESKRIPSI_MAX: 140;
};
export type Bidang = 'Kesehatan' | 'Pendidikan' | 'Ekonomi' | 'Lingkungan' | 'Sosial' | 'Teknologi' | 'Budaya';
export declare const BIDANG_DAFTAR: Bidang[];
export declare const KABUPATEN_DAFTAR: readonly ["Cilacap", "Banyumas", "Purbalingga", "Banjarnegara", "Kebumen", "Purworejo", "Wonosobo", "Magelang", "Boyolali", "Klaten", "Sukoharjo", "Wonogiri", "Karanganyar", "Sragen", "Grobogan", "Blora", "Rembang", "Pati", "Kudus", "Jepara", "Demak", "Semarang", "Temanggung", "Kendal", "Batang", "Pekalongan", "Pemalang", "Tegal", "Brebes", "Kota Magelang", "Kota Surakarta", "Kota Salatiga", "Kota Semarang", "Kota Pekalongan", "Kota Tegal"];
export type Kabupaten = (typeof KABUPATEN_DAFTAR)[number];
