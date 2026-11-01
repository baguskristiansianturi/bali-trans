# GLB-004 / GLB-005 — Pencarian Header dan Kontrol Bahasa/Wilayah

**Status penerapan:** Antarmuka dan pengendali bersama tersedia  
**Status persetujuan:** BELUM DICATAT DI MASTER INI  
**Sumber:**
- `assets/js/global-shell.js`
- `assets/js/interactions.js`
- `assets/js/locale.js`
- `assets/js/data.js`
- `assets/css/global-shell.css`

## A. Pencarian Header

Elemen saat ini:
- Pemicu pencarian: `#headerSearchButton`
- Panel pencarian: `#headerSearchPanel`
- Formulir pencarian: `#btSearchForm`
- Kolom masukan pencarian: `#headerSearchInput`
- Wadah hasil: `#searchResultsDropdown`

Pencarian header merupakan kontrol kerangka bersama. Halaman utama juga memiliki kolom pencarian hero yang terpisah; jangan menganggap kedua kontrol tersebut komponen yang sama sebelum memeriksa pengendali dan perilaku hasilnya.

Sebelum mengubah pencarian, telusuri pengendali peristiwa dan sumber data di `assets/js/interactions.js` serta `assets/js/data.js`.

## B. Bahasa dan Mata Uang

Pilihan bahasa/wilayah global saat ini:
- Bahasa Indonesia — IDR.
- English — USD ($).

Kontrol dibuat dari daftar `localeOptions` di `global-shell.js`. Logika bahasa dan pemformatan juga tersedia di `assets/js/locale.js` serta data bersama.

Jangan menganggap bahasa tambahan, mata uang tambahan, kurs otomatis, atau konversi valuta asing langsung sudah diterapkan. Audit repository mencatat bahwa kurs masih ditulis tetap dan tidak boleh digambarkan sebagai kurs langsung terkini.

## Dampak Perubahan

Pencarian dapat memengaruhi penemuan rute dan pemilihan hasil. Bahasa/wilayah dapat memengaruhi teks, format, dan harga di berbagai tampilan. Perubahan perlu diuji pada pencarian header dan pencarian halaman utama jika relevan, serta tampilan bahasa dan halaman contoh dalam kedua bahasa.
