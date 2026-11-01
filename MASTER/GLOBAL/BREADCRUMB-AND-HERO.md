# GLB-007 / GLB-008 — Pemetaan Breadcrumb dan Hero

**Status penerapan:** KHUSUS HALAMAN / BELUM MENJADI SATU KOMPONEN GLOBAL  
**Status persetujuan:** BELUM DICATAT DI MASTER INI  
**Sumber terkait:**
- `assets/js/views/detail.js`
- `assets/js/views/home.js`
- `assets/js/views/discovery.js`
- `assets/js/views/articles.js`
- HTML halaman mandiri dan CSS khusus halaman

## A. Breadcrumb / Penunjuk Lokasi Halaman

Breadcrumb visual tersedia pada pembentuk tampilan detail Dolphin Tour di `assets/js/views/detail.js` (kelas `.dolphin-breadcrumb`).

Metadata rute di `assets/js/navigation.js` juga membuat informasi breadcrumb untuk data terstruktur. Breadcrumb data terstruktur tidak sama dengan komponen breadcrumb yang terlihat oleh pengunjung.

Kesimpulan saat ini:
- Komponen visual breadcrumb universal belum ditetapkan dalam inventaris Master saat ini.
- Jangan menambahkan breadcrumb ke semua halaman berdasarkan asumsi.
- Penggunaan per halaman dan pengecualiannya harus dipetakan sebelum menetapkan standar breadcrumb bersama.

## B. Hero / Bagian Pembuka Halaman

Bagian hero diterapkan pada beberapa konteks khusus halaman, termasuk halaman utama SPA, detail Dolphin Tour, dan halaman layanan mandiri.

Kesimpulan saat ini:
- Belum ada satu komponen hero universal yang telah diverifikasi untuk semua kelompok halaman.
- Kelompok halaman yang berbeda mungkin memerlukan susunan hero yang berbeda.
- Jangan memaksakan satu tata letak hero ke halaman yang tidak berkaitan.
- Urutan bagian, label, tombol ajakan, dan perilaku responsif yang tepat harus dicatat per pola halaman yang disetujui.

## Kebutuhan Pemetaan Berikutnya

Ketika pola halaman diperiksa dan disetujui, catat aturan hero/breadcrumb pada dokumen kelompok halaman tersebut dan hubungkan dari dokumen ini. Berkas ini merupakan peta penerapan saat ini, bukan instruksi desain baru.
