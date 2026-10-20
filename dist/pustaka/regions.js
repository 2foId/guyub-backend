"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOCAL_REGION_NAMES = void 0;
exports.slugForRegion = slugForRegion;
exports.LOCAL_REGION_NAMES = [
    'Cilacap',
    'Banyumas',
    'Purbalingga',
    'Banjarnegara',
    'Kebumen',
    'Purworejo',
    'Wonosobo',
    'Magelang',
    'Boyolali',
    'Klaten',
    'Sukoharjo',
    'Wonogiri',
    'Karanganyar',
    'Sragen',
    'Grobogan',
    'Blora',
    'Rembang',
    'Pati',
    'Kudus',
    'Jepara',
    'Demak',
    'Semarang',
    'Temanggung',
    'Kendal',
    'Batang',
    'Pekalongan',
    'Pemalang',
    'Tegal',
    'Brebes',
    'Kota Magelang',
    'Kota Surakarta',
    'Kota Salatiga',
    'Kota Semarang',
    'Kota Pekalongan',
    'Kota Tegal',
];
function slugForRegion(nama) {
    return nama.toLocaleLowerCase('id-ID').replace(/\s+/g, '-');
}
//# sourceMappingURL=regions.js.map