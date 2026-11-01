# GLB-001 — Master Navbar / Header Bersama

**Status penerapan:** SUDAH DITERAPKAN  
**Status persetujuan:** BELUM DICATAT DI MASTER INI  
**Sumber markup/logika utama:** `assets/js/global-shell.js`  
**Sumber gaya bersama utama:** `assets/css/global-shell.css`  
**Gaya/perilaku terkait:** `assets/css/navigation.css`, `assets/js/interactions.js`  
**Versi yang diperiksa:** `a8d4282293d98923ecf160f52d95fe6168dd905d`

## Tujuan

Menyediakan identitas website, pintu masuk navigasi, dan kontrol alat bantu bersama untuk halaman yang menggunakan kerangka global.

## Penanda Merek Saat Ini

- Teks merek yang diatur di `global-shell.js`: **Bali Trans**.
- Penanda saat ini dibuat dari huruf pertama nama merek (huruf “B”) di dalam elemen yang diberi gaya.
- Catatan ini belum mengidentifikasi aset gambar logo terpisah yang telah disetujui. Jangan mengganti penanda atau membuat logo baru tanpa permintaan yang jelas.

## Elemen Header Saat Ini

| Elemen | Penerapan saat ini | Catatan |
|---|---|---|
| Tautan merek/logo | `.bt-brand` | Mengarah ke halaman utama; penanda berupa huruf B dan teks merek |
| Tombol pencarian | `#headerSearchButton` | Membuka panel pencarian header |
| Bantuan | `.bt-help-link` | Tautan alat bantu desktop |
| Blog | `.bt-blog-link` | Tautan desktop menuju halaman Blog |
| Baru dilihat | `.bt-recent-action` | Aksi alat bantu desktop |
| Akun | `#accountMenuButton` | Membuka menu akun |
| Bahasa/mata uang | `#localeButton` | Membuka menu bahasa/wilayah |
| Menu hamburger | `#mobileMenuButton` | Membuka panel menu perangkat seluler |
| Obrolan langsung | `.bt-live-chat` | Tautan kontak dengan status luring; tidak ditampilkan jika elemen status obrolan langsung utama tersedia |

## Isi Menu Perangkat Seluler

Tautan menu dibuat dari daftar tautan bersama:
- Beranda
- Destinasi
- Wisata
- Layanan transportasi
- Panduan wisata
- Tentang
- Kontak

Area akun pada menu perangkat seluler mencakup:
- Tombol/tautan masuk;
- Tombol keluar jika sesuai;
- Petunjuk pendaftaran dan tautan Daftar.

Khusus halaman utama SPA, terdapat tindakan menu tambahan:
- Bantuan
- Daftar keinginan dengan jumlah item
- Baru dilihat

## Catatan Desktop dan Perangkat Seluler

- Header menggunakan `.bt-site-header` dan dibuat tetap menempel di bagian atas dengan z-index 1000 di `global-shell.css`.
- Tinggi minimum baris header secara bawaan 68px dan menjadi 78px mulai lebar tampilan 768px.
- Tombol hamburger disembunyikan mulai lebar 768px.
- CSS memiliki aturan navigasi desktop `.bt-main-nav`, tetapi HTML header yang dibuat oleh `global-shell.js` saat ini tidak menyertakan elemen `.bt-main-nav`. Catat sebagai ketidaksesuaian pemetaan; jangan menganggap aturan CSS tersebut merupakan menu desktop yang aktif.
- Menu perangkat seluler menggunakan kisi tautan dua kolom pada stylesheet bersama saat ini.
- Pada lebar hingga 380px, tindakan header dan label obrolan langsung menggunakan gaya yang lebih ringkas.

## Perilaku dan Ketergantungan

- Tujuan rute bersama diatur dalam objek `routes` pada `global-shell.js`.
- Label dan tujuan tautan menu dibuat dari daftar `links` di berkas yang sama.
- Interaksi pencarian, akun, bahasa/wilayah, dan menu seluler dihubungkan melalui perilaku aplikasi bersama; periksa `assets/js/interactions.js` sebelum mengubahnya.
- Kerangka bersama disisipkan oleh `global-shell.js`; jangan menggandakan markup header di halaman masing-masing.
- Gaya header digunakan bersama; jangan menimpanya dari CSS halaman yang tidak terkait.

## Pengecualian

- Halaman checkout sengaja tidak menggunakan kerangka bersama atau menyembunyikannya pada mode checkout. Lihat `MASTER/00-SYSTEM-MAP.md` dan `ARCHITECTURE.md`.
- Halaman utama SPA juga memiliki navigasi bawah perangkat seluler terpisah; bagian tersebut bukan bagian dari navbar.

## Dampak Perubahan

Dampak tinggi. Perubahan dapat memengaruhi rute SPA dan halaman mandiri yang memuat kerangka bersama. Sebelum mengubah:
1. Baca `SOP.md`, `ARCHITECTURE.md`, dan Master ini.
2. Identifikasi semua halaman yang memuat kerangka bersama.
3. Pastikan ruang lingkup permintaan dengan Mas Bagus.
4. Uji ulang navigasi desktop/seluler, pencarian, akun, dan kontrol bahasa.
5. Uji pengecualian checkout dan navigasi bawah SPA.
6. Perbarui Master ini serta daftar repository/serah terima jika diperlukan.

## Kekurangan yang Diketahui — Dokumentasi Saja

- Aset/spesifikasi logo yang benar-benar disetujui belum dicatat di sini.
- Susunan navigasi utama desktop yang diharapkan perlu dikonfirmasi terhadap halaman yang tayang.
- Kumpulan ikon final yang disetujui, ukuran area sentuh, dan perilaku tablet terperinci belum dicatat sebagai standar tetap.
- Pemeriksaan visual pada perangkat nyata tidak boleh diklaim hanya berdasarkan pemeriksaan kode.
